import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';
import { Link } from 'react-router-dom';


class StreamDelete extends React.Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    renderActions() {
        return ( <React.Fragment>
                <button className="ui button negative"
                    onClick={() => this.props.deleteStream(this.props.match.params.id)}
                >
                    Delete
                </button>
                <Link to="/"className="ui button">Cancel</Link>
            </React.Fragment>
        )
    };

    renderContent() {
        if(!this.props.stream) {
            return "Are you sure you want to delete";
        }else{
            return`Are you sure you want to delete ${this.props.stream.title}`;
        }
    }

    render(){
        return(
                <Modal 
                    header="Delete Stream"
                    content={this.renderContent()}
                    onDismiss ={()=>history.push("/")}
                    actions={this.renderActions()}
                />
        )
    }      
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps, {
    fetchStream,
    deleteStream
})(StreamDelete);