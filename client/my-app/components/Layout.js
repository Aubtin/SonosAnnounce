import Head from 'next/head';
import Navbar from './Navbar';

const Layout = (props) => (
	<div >
		<Head>
			<title>Cash Dash</title>
			<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
			<link
			  rel="stylesheet"
			  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
			  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
			  crossOrigin="anonymous"
			/>
			<script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin />

		</Head>
		<style jsx global> {`
				header {
					color: #FFFFFF
				}
				body {
					background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
					
				}
			`}
		</style>
		<Navbar/>
		<div>
			{props.children}
		</div>
		
	</div>

);

export default Layout;
