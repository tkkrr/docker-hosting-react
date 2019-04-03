import React from 'react'
import { render } from 'react-dom'

// import finger from './FingerArc.pdf'

const App = props => {

	// React.useEffect( () => {
	// 	const pdfjsLib = require('pdfjs-dist');

	// 	pdfjsLib.GlobalWorkerOptions.workerSrc = "./pdf.worker.bundle.js";
	// 	// pdfjsLib.cMapUrl = "./cmaps/";
	// 	// pdfjsLib.cMapPacked = true;
		
	// 	pdfjsLib.getDocument( input ).then( pdfDocument => {
	// 		// console.log(pdfDocument)
	// 		pdfDocument.getPage(5).then( pdfPage => {
	// 			pdfPage.getTextContent().then( textContent => {
	// 				const textItems = textContent.items;
	// 				let finalString = "";
	
	// 				for (let i = 0; i < textItems.length; i++) {
	// 					let item = textItems[i];
	// 					finalString += item.str;
	// 				}

	// 				// resolve(finalString);
	// 				// return finalString
	// 				console.log(finalString)
	// 			});
	// 		})
	// 	}).catch( (reason) => {
	// 		console.error('Error: ' + reason);
	// 	});
	// })

	const [doi, setDoi] = React.useState("")
	const [bookJson, setBookJson] = React.useState("")

	// fetch( "http://dx.doi.org/10.1145/3242587.3242589", 
	// 	{
	// 		method: "GET",
	// 		mode: "cors",
	// 		headers: {
	// 			Accept : "application/vnd.citationstyles.csl+json"
	// 		}
	// 	}
	// ).then( response =>
	// 	response.json()
	// ).then( data => {
	// 	if (data){
	// 		console.log( JSON.stringify(data,null,'  ') )
	// 		setDoi( JSON.stringify(data) )
    //     }else{
	// 		console.log("something wrong ...")
	// 	}
	// })

	// fetch( "https://www.googleapis.com/books/v1/volumes?q=isbn:9784575239058",
	// 	{
	// 		method: "GET",
	// 		mode: "cors"
	// 	}
	// ).then( response =>
	// 	response.json()
	// ).then( data => {
	// 	if(data){
	// 		console.log( JSON.stringify(data) )
	// 		setBookJson( JSON.stringify(data) )
	// 	}else{
	// 		console.log( "something wrong ..." )
	// 	}
	// })

	fetch( "http://localhost/api/test/_search?pretty",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
					"query": {
						"match": {
							"description" : "数学"
						}
					}
				}
			)
		}
	).then( response => 
		response.json()
	).then( json => {
			if(json) setDoi(json.hits.hits[0]._source.description )
			else console.log( "something wrong..." )
		}
	)


	return <React.Fragment>
		<p>react pdf check</p>
		<p id="doi">doi is {doi}</p>
		<p id="book">book is {bookJson}</p>
		<canvas id="theCanvas"></canvas>
	</React.Fragment>
}

render(<App/>, document.getElementById('app'));