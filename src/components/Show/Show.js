import React, { Component } from 'react';
import { getShowInfo } from 'api.js';
import './Show.css';

export default class Show extends Component {
    state = {
        showId: undefined,
        data: null
    };

    componentDidUpdate() {
        if (this.props.showId === '' || this.props.showId === this.state.showId) return;

        this.setState({
            showId: this.props.showId
        })

        getShowInfo(this.props.showId)
            .then((response) => {
                this.setState({
                    data: response
                })
            })
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