import React from 'react'

export default function lazyLoad(getComponent) {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                Component: null
            }
        }

        async componentWillMount() {
            const { default: component } = await getComponent();

            this.setState({
                Component: component
            })
        }

        render() {
            const Component = this.state.Component;
            return !!Component ? <Component {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}