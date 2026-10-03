#!/usr/bin/env python3
"""Gera public/tse/<uf>/<cargo>.json para os 27 estados: a ficha de cada candidato a
governador, senador, deputado federal e deputado estadual (ou distrital, no DF),
montada só com arquivos oficiais do Portal de Dados Abertos do TSE.

    python3 scripts/deputados.py [pasta-de-cache]

Baixa os .zip para a pasta de cache (padrão: .cache-tse) se ainda não estiverem lá.
Nada aqui é digitado à mão: registro, bens, redes sociais, candidaturas anteriores e
prestação de contas vêm direto dos CSV. CPF de doador sai parcialmente mascarado.
"""
import csv, io, json, os, sys, urllib.request, zipfile
from collections import defaultdict

CDN = 'https://cdn.tse.jus.br/estatistica/sead/odsele/'
ZIPS = {
    'cand': 'consulta_cand/consulta_cand_2026.zip',
    'compl': 'consulta_cand_complementar/consulta_cand_complementar_2026.zip',
    'bens': 'bem_candidato/bem_candidato_2026.zip',
    'redes': 'consulta_cand/rede_social_candidato_2026.zip',
    'hist': 'historico_candidatura/historico_candidatura_2026.zip',
    'contas': 'prestacao_contas/prestacao_de_contas_eleitorais_candidatos_2026.zip',
}
UFS = 'AC AL AM AP BA CE DF ES GO MA MG MS MT PA PB PE PI PR RJ RN RO RR RS SC SE SP TO'.split()
CARGOS = {'GOVERNADOR': 'governador', 'SENADOR': 'senador', 'DEPUTADO FEDERAL': 'depfed',
          'DEPUTADO ESTADUAL': 'depest', 'DEPUTADO DISTRITAL': 'depest'}
cache = sys.argv[1] if len(sys.argv) > 1 else '.cache-tse'
os.makedirs(cache, exist_ok=True)

def ler(chave, arquivo):
    caminho = os.path.join(cache, os.path.basename(ZIPS[chave]))
    if not os.path.exists(caminho):
        print('baixando', ZIPS[chave], file=sys.stderr)
        urllib.request.urlretrieve(CDN + ZIPS[chave], caminho)
    with zipfile.ZipFile(caminho).open(arquivo) as f:
        return list(csv.DictReader(io.TextIOWrapper(f, encoding='latin-1'), delimiter=';'))

nulo = lambda s: None if s is None or s.strip() in ('', '#NULO', '#NULO#', '#NE', '-1', '-3', '-4') else s.strip()
valor = lambda s: float(s.replace('.', '').replace(',', '.')) if ',' in s else float(s)
MINUSC = {'de', 'da', 'do', 'das', 'dos', 'e'}
def nome(s):
    s = nulo(s)
    if not s: return None
    return ' '.join(w.lower() if w.lower() in MINUSC and i else w.capitalize()
                    for i, w in enumerate(s.split()))
frase = lambda s: (lambda t: t[0].upper() + t[1:].lower() if t else None)(nulo(s) or '')

def doc(d):
    d = ''.join(ch for ch in (d or '') if ch.isdigit())
    if len(d) == 11: return f'CPF {d[:3]}.***.**{d[8]}-{d[9:]}'
    if len(d) == 14: return f'CNPJ {d[:2]}.{d[2:5]}.{d[5:8]}/{d[8:12]}-{d[12:]}'
    return None

ORIGEM = {
    'Recursos de partido político': 'partido', 'Recursos de pessoas físicas': 'pf',
    'Recursos próprios': 'proprio', 'Recursos de Financiamento Coletivo': 'coletivo',
    'Recursos de outros candidatos': 'candidato',
    'Fundo Especial de Financiamento de Campanha': 'partido',
}

def gera(UF):
    cand = [r for r in ler('cand', f'consulta_cand_2026_{UF}.csv') if r['DS_CARGO'] in CARGOS]
    compl = {r['SQ_CANDIDATO']: r for r in ler('compl', f'consulta_cand_complementar_2026_{UF}.csv')}
    gerado = cand[0]['DT_GERACAO']

    bens = defaultdict(list)
    for r in ler('bens', f'bem_candidato_2026_{UF}.csv'):
        bens[r['SQ_CANDIDATO']].append({'tipo': frase(r['DS_TIPO_BEM_CANDIDATO']),
            'desc': frase(r['DS_BEM_CANDIDATO']), 'v': valor(r['VR_BEM_CANDIDATO'])})

    redes = defaultdict(list)
    for r in sorted(ler('redes', f'rede_social_candidato_2026_{UF}.csv'), key=lambda r: int(r['NR_ORDEM_REDE_SOCIAL'])):
        for u in (nulo(r['DS_URL']) or '').lower().split():   # há campos com mais de um endereço
            u = u.split('?')[0]
            if u.startswith('http') and u not in redes[r['SQ_CANDIDATO']]: redes[r['SQ_CANDIDATO']].append(u)

    hist = defaultdict(list)
    for r in ler('hist', f'historico_candidatura_2026_{UF}.csv'):
        if r['ANO_ELEICAO'] == '2026': continue
        hist[r['SQ_CANDIDATO_ATUAL']].append({'ano': int(r['ANO_ELEICAO']), 'cargo': frase(r['DS_CARGO']),
            'local': nome(r['NM_UE']), 'partido': r['SG_PARTIDO'], 'turno': int(r['NR_TURNO']),
            'resultado': nulo(r['DS_SIT_TOT_TURNO'])})

    rec = defaultdict(dict)   # receitas por candidato, sem repetir o mesmo lançamento
    contas_em = None
    for r in ler('contas', f'receitas_candidatos_2026_{UF}.csv'):
        rec[r['SQ_CANDIDATO']][r['SQ_RECEITA']] = r
        contas_em = r['DT_GERACAO']
    desp = defaultdict(dict)
    for r in ler('contas', f'despesas_contratadas_candidatos_2026_{UF}.csv'):
        desp[r['SQ_CANDIDATO']][r['SQ_DESPESA']] = r

    def financas(sq):
        rs = list(rec[sq].values())
        out = None
        if rs:
            origens, doad = defaultdict(float), {}
            for r in rs:
                v = valor(r['VR_RECEITA']); t = ORIGEM.get(r['DS_ORIGEM_RECEITA'], 'outro')
                origens[t] += v
                ch = r['NR_CPF_CNPJ_DOADOR'] + '|' + r['NM_DOADOR']
                d = doad.setdefault(ch, {'nome': nome(r['NM_DOADOR_RFB']) or nome(r['NM_DOADOR']) or 'Não identificado',
                    'doc': doc(r['NR_CPF_CNPJ_DOADOR']), 'tipo': t, 'v': 0.0})
                d['v'] += v
            top = sorted(doad.values(), key=lambda d: -d['v'])
            for d in top: d['v'] = round(d['v'], 2)
            out = {'tot': round(sum(origens.values()), 2), 'ndoad': len(doad),
                   'origens': {k: round(v, 2) for k, v in sorted(origens.items(), key=lambda kv: -kv[1])},
                   'doadores': top[:8]}
        ds = list(desp[sq].values())
        if ds:
            cat = defaultdict(float)
            for r in ds: cat[frase(r['DS_ORIGEM_DESPESA']) or 'Outras'] += valor(r['VR_DESPESA_CONTRATADA'])
            out = out or {'tot': 0, 'ndoad': 0, 'origens': {}, 'doadores': []}
            out['despesa'] = round(sum(cat.values()), 2)
            out['gastos'] = [{'tipo': k, 'v': round(v, 2)} for k, v in sorted(cat.items(), key=lambda kv: -kv[1])[:6]]
        return out

    saida = {v: [] for v in set(CARGOS.values())}
    for r in cand:
        sq = r['SQ_CANDIDATO']; c = compl.get(sq, {})
        b = sorted(bens[sq], key=lambda x: -x['v'])
        saida[CARGOS[r['DS_CARGO']]].append({
            'sq': sq, 'nr': r['NR_CANDIDATO'], 'nome': nome(r['NM_CANDIDATO']),
            'urna': nome(r['NM_URNA_CANDIDATO']), 'partido': r['SG_PARTIDO'],
            'partidoNome': nome(r['NM_PARTIDO']), 'federacao': nome(r['NM_FEDERACAO']),
            'ocupacao': frase(r['DS_OCUPACAO']), 'instrucao': frase(r['DS_GRAU_INSTRUCAO']),
            'genero': frase(r['DS_GENERO']), 'corRaca': frase(r['DS_COR_RACA']),
            'estadoCivil': frase(r['DS_ESTADO_CIVIL']),
            'nascimento': ' · '.join(x for x in [nome(c.get('NM_MUNICIPIO_NASCIMENTO')), nulo(r['SG_UF_NASCIMENTO'])] if x) or None,
            'idadePosse': int(c['NR_IDADE_DATA_POSSE']) if nulo(c.get('NR_IDADE_DATA_POSSE')) else None,
            'registro': frase(c.get('DS_SITUACAO_JULGAMENTO')),
            'naUrna': c.get('ST_CANDIDATO_INSERIDO_URNA') == 'SIM',
            'destinoVotos': frase(c.get('NM_TIPO_DESTINACAO_VOTOS')),
            'limiteGastos': float(c['VR_DESPESA_MAX_CAMPANHA']) if nulo(c.get('VR_DESPESA_MAX_CAMPANHA')) else None,
            'bens': {'tot': round(sum(x['v'] for x in b), 2), 'n': len(b), 'itens': b[:8]} if b else None,
            'redes': redes[sq][:5],
            'historico': sorted(hist[sq], key=lambda h: (-h['ano'], h['turno'])),
            'fin': financas(sq),
        })

    os.makedirs(f'public/tse/{UF.lower()}', exist_ok=True)
    for k, lista in saida.items():
        lista.sort(key=lambda x: x['urna'] or '')
        with open(f'public/tse/{UF.lower()}/{k}.json', 'w', encoding='utf-8') as f:
            json.dump({'geradoEm': gerado, 'contasEm': contas_em, 'lista': lista}, f, ensure_ascii=False, separators=(',', ':'))
        print(UF, k, len(lista), 'candidaturas,', sum(1 for x in lista if x['fin']), 'com contas,',
              sum(1 for x in lista if x['bens']), 'com bens,', sum(1 for x in lista if x['historico']), 'com candidaturas anteriores')


for uf in UFS:
    gera(uf)
