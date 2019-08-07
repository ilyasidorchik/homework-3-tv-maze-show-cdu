import React, { Component } from 'react';
import { getShowInfo } from 'api.js';
import './Show.css';

export default class Show extends Component {
    state = {
        showId: undefined,
        data: null
    };
    
    componentDidUpdate() {
        const { showId } = this.props;

        if (showId === this.state.showId) return;

        this.setState({
            showId: showId,
            data: null
        })

        getShowInfo(showId)
            .then((data) => {
                this.setState({ data });
            });
    }

    render() {
        const { data } = this.state;

        if (data) {
            return (
                <div className="show">
                    <img src={data.image.original} alt={data.name} className="show-image"/>
                    <h2 className="show-label t-show-name">{data.name}</h2>
                    <p className="show-text t-show-gengre"><b>Жанр: </b>{data.genres.join(', ')}</p>
                    <p className="show-text t-show-summary" dangerouslySetInnerHTML={{__html: data.summary}}></p>
                </div>
            );
        }
        else {
            return <p className="show-inforation t-show-info">Шоу не выбрано</p>;
        }
    }
}