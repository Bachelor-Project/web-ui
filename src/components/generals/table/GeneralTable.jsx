import React, {Component} from 'react';
import {Table} from 'react-bootstrap';



class TableCustomRow extends Component {

	render (){
		return (
			<tr>
				<td>{this.props.index}</td>
				<td><a href="/index.html">{this.props.data.name}</a></td>
				<td>{this.props.data.descrip}</td>
				<td>{this.props.data.number}</td>
			</tr>
		);
	}
}


class GeneralTable extends Component {


	render (){
		const headData = this.props.headData;
		const bodyData = this.props.bodyData;
		var heads = [];
		var rows = [];

		headData.forEach((colName, i) => {
			heads.push(<th className="text-center" key={i}>{colName}</th>);
		});

		bodyData.forEach((entry, i) => {
			rows.push(<TableCustomRow index={i+1} data={entry} key={i} />);
		});

		return (
				<Table bordered condensed hover>
				    <thead>
						<tr>
							{heads}
						</tr>
					</thead>
				    <tbody>{rows}</tbody>
			  	</Table>
		)
	} 
}

export default GeneralTable;