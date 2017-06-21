import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {LinkComponent} from '../helpers/Components';



class TableCustomRow extends Component {

	render (){
		return (
			<tr>
				<td>{this.props.index}</td>
				<td><LinkComponent to={this.props.path + '/' + this.props.data.id} label={this.props.data.name} /></td>
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
			rows.push(<TableCustomRow path={this.props.path} index={i+1} data={entry} key={i} />);
		});

		return (
				<div className="container" style={{margin: '5% auto'}}>
					<h2 style={{textAlign: 'center', marginBottom: '20px'}} >{this.props.pageTitle}</h2>
					<Table bordered condensed hover >
					    <thead>
							<tr>
								{heads}
							</tr>
						</thead>
					    <tbody>{rows}</tbody>
				  	</Table>
		  		</div>
		)
	} 
}

export default GeneralTable;