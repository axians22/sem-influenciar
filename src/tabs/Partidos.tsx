import { FEDERACOES as F, PARTIDOS_CAMARA as C, PARTIDOS_GOVERNADORES, PARTIDOS_SENADO }
  from '../data/partidos';
import { BarChart } from '../components/Chart';
import { Card, DataTable, Note, PageHead, Sources, Table } from '../components/ui';

export default function Partidos(){
  return (
    <>
      <PageHead title="Os partidos">
        Tamanho de cada bancada hoje, antes da apuração. Uma federação partidária obriga os partidos
        que a integram a atuar unidos por no mínimo quatro anos, como se fossem um só partido.
      </PageHead>

      <Card title={C.titulo} subtitle={`${C.subtitulo}. Total de ${C.total} deputados.`}>
        <BarChart unidade="Deputados" alt="Número de deputados federais por partido e federação."
          rows={C.linhas.map(r => ({ label: r.sigla, v: r.v,
            note: r.nome + (r.federacao ? ' · federação' : '') }))} />
        <Note>{C.notaEspectro}</Note>
        <DataTable label="Ver bancada com nome e espectro"
          headers={['Sigla', 'Nome', { t: 'Deputados', n: true }, 'Espectro']}
          rows={C.linhas.map(r => [r.sigla, r.nome!, r.v, r.espectro!])} />
        <Sources fontes={[{ t: 'Câmara dos Deputados', u: C.fonte },
          { t: 'Classificação ideológica (UBS Brasil)', u: C.fonteEspectro! }]} />
      </Card>

      <div className="grid gap-x-4 md:grid-cols-2">
        {([[PARTIDOS_SENADO, 'Senadores'], [PARTIDOS_GOVERNADORES, 'Governadores']] as const).map(([P, un]) => (
          <Card key={un} title={P.titulo} subtitle={P.subtitulo}>
            <BarChart unidade={un} alt={P.titulo}
              rows={P.linhas.map(r => ({ label: r.sigla, v: r.v, note: r.nota }))} />
            {P.nota && <Note>{P.nota}</Note>}
            <DataTable label="Ver em tabela" headers={['Partido', { t: un, n: true }]}
              rows={P.linhas.map(r => [r.sigla + (r.nota ? ' (' + r.nota + ')' : ''), r.v])} />
            <Sources fontes={[{ t: 'Fonte', u: P.fonte }]} />
          </Card>
        ))}
      </div>

      <Card title={F.titulo} subtitle={F.nota}>
        <Table headers={['Federação', 'Partidos', 'Deferimento']}
          rows={F.linhas.map(r => [r.nome, r.partidos, r.deferimento])} />
        <Sources fontes={[{ t: 'TSE · federações registradas', u: F.fonte }]} />
      </Card>
    </>
  );
}
