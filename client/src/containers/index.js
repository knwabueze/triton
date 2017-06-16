import React from 'react'
import { Link } from 'react-router-dom'
import '../static/css/index.css'

export default class Index extends React.Component {
    render() {
        return (
            <div className="Index-root">
                <div className="container-flex">
                    <div className="top">
                        <h1 className="title">(next, express) => triton</h1>
                        <h3 className="subtitle">Triton is an Express-driven API with one endpoint that exposes Intel's various codenames for their projects. This API is meant to display how Next.js seamlessly integrates with a real project.</h3>
                    </div>
                    <div className="center">
                        <Link to="/codenames">
                            <button className="cta">
                                {
                                    `(start) => {}`
                                }
                            </button>
                        </Link>
                    </div>
                    <div className="bottom">
                        <div className="server-paragraph">
                            <h2 className="h2-title">(server) => {}</h2>
                            <p>
                                Triton Serverside employs the use of isomorphic-fetch,
                                a datafetching library which has both serverside and
                                clientside implementations. The serverside also features
                                usage of Express.js, an abstraction-layer over Node's http
                                module, and Next.js, a framework developed by ZEIT to make
                                serverside rendering more applicable for React.
                            </p>
                        </div>
                        <div className="client-paragraph">
                            <h2 className="h2-title">(client) => {}</h2>
                            <p>
                                Clientside Triton uses isomorphic-fetch just as its
                                serverside counterpart does. Triton uses its singular
                                endpoint for retrieving all of the data while all filtering
                                and alterations of data are done on client side. Triton
                                is primarily built upon React, Facebook's rendering framework
                                for web.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}