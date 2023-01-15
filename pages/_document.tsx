import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
	return (
		<Html lang='pt-br'>
			<Head>
				<meta name='application-name' content='Sistema de Cadastro' />
				<meta name='author' content='Matheus Pergoli' />
				<meta property='og:title' content='Sistema de Cadastro' />
				<meta property='og:description' content='Sistema de Cadastro - Matheus Pergoli' />
				<meta property='og:image' content='/image.png' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
