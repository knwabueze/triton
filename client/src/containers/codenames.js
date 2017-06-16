import React from 'react'
import PropTypes from 'prop-types'
import getCodenames, { filterCodenames } from '../lib/get-codenames'
import CodenamesView from '../components/codenames-view'
import '../static/css/codenames.css'

export default class Codenames extends React.Component {
    static propTypes = {
        fetch: PropTypes.func
    }

    static defaultProps = {
        fetch: getCodenames
    }

    constructor(props) {
        super(props);

        this.state = {
            codenames: null,
            filter: '',
            searchBy: 'Codename',
            rerender: true
        }
    }

    async componentWillMount() {
        let codenames;
        try {
            codenames = await this.props.fetch();
        } catch (ex) {
            throw ex;
        }

        this.setState({
            codenames
        })
    }

    onSearchChange = event => {
        let filter;
        if (event.target.value === '') {
            filter = '';
        } else {
            filter = event.target.value.toLowerCase();
        }
        this.setState({ filter })
    }

    onSearchByChange = event => {
        console.log(event.target.value);
        this.setState({ searchBy: event.target.value })
        this.setState({ filter: '' })
        this.refs.codenamesInput.value = '';
    }

    determineQuery(i) {
        const { filter, searchBy } = this.state;
        let query;

        if (filter === '') {
            return false;
        }

        switch (searchBy) {
            case 'Codename':
            case 'Category':
            case 'Description':
            case 'Named_After':
                if (i[searchBy] !== null) {
                    query = i[searchBy].toLowerCase().includes(filter);
                } else {
                    query = false;
                }
                break;
            case 'Year':
                if (tryParseInt(i[searchBy]).length < 4) {
                    query = false;
                } else {
                    query = tryParseInt(i[searchBy]) > filter;
                }
                break;
            default:
                query = false;
                break;
        }

        return query;
    }

    render() {
        const { filter, codenames, searchBy } = this.state;
        const json = filter !== '' ? filterCodenames(codenames, i => this.determineQuery(i)) : codenames;
        return this.state.codenames ? (
            <section data-page="codenames" className="codenames__container">
                <h1 className="codenames__title">('/api/codenames') => [{json.length}]</h1>
                <div className="codenames__search__form">
                    <input ref="codenamesInput" className="codenames__search" placeholder="Search" type="text" onChange={this.onSearchChange} />
                    <div className="codenames__search__select__container">
                        <label className="codenames__search__select__label" htmlFor="codenames-select">Search By</label>
                        <select defaultValue={searchBy} onChange={this.onSearchByChange} name="codenames-select" className="codenames__search__select">
                            <option value="Codename">Codename</option>
                            <option value="Category">Category</option>
                            <option value="Description">Description</option>
                            <option value="Named_After">Named After</option>
                            <option value="Year">After Year</option>
                        </select>
                    </div>
                </div>
                <CodenamesView className="codenames__editor" json={JSON.stringify(json, null, '\t')} />
            </section>
        ) : null;
    }
}

function tryParseInt(str) {
    let returnValue = String(str);
    if (str != null) {
        if (!isNaN(str)) {
            returnValue = parseInt(str, 10);
        } else {
            return 0;
        }
    }
    return returnValue;
}