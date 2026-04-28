import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home({ instruments }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Instrument Education</h1>

      {instruments.map((inst) => (
        <div key={inst.id} style={{ marginBottom: 20 }}>
          <a href={`/${inst.slug}`}>
            <h2>{inst.instrument_name}</h2>
          </a>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await supabase
    .from('instruments')
    .select('*')
    .eq('status', 'published')
    .order('sort_name', { ascending: true })

  return {
    props: {
      instruments: data || []
    }
  }
}
