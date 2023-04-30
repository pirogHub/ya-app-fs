import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, name: props.name }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        console.log(`ERROR: component NAME: ${this.state.name}`, error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return <h1>{`ERROR: component NAME: ${this.state.name}`}</h1>
        } else {
            return this.props.children
        }
    }
}


export default ErrorBoundary