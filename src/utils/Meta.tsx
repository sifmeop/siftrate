import Head from 'next/head'

interface Props {
  title: string
  description: string
}

export const Meta = ({ title, description }: Props) => {
  return (
    <Head>
      <title>{title} | SIFTRATE</title>
      <meta name='description' content={description} />
    </Head>
  )
}
