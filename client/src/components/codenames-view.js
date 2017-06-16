import React from 'react'
import PropTypes from 'prop-types'

class CodenamesView extends React.Component {
    componentDidMount() {
        window.hljs.highlightBlock(this.refs.code);
    }

    componentDidUpdate() {
        window.hljs.highlightBlock(this.refs.code);
    }

    render() {
        return (
            <pre className={this.props.className}>
                <code ref="code" className="json" style={{
                    fontFamily: "'Fira Code', sans-serif",
                    fontSize: 12
                }}>
                    {this.props.json}
                </code>
            </pre>
        );
    }
}

CodenamesView.propTypes = {
    json: PropTypes.string.isRequired
}

export default CodenamesView;