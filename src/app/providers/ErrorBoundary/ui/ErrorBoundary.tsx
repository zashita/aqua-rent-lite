import React, { type ErrorInfo, type ReactNode } from 'react'
import { types } from 'sass'
import Error = types.Error
import { PageError } from 'widgets/PageError'

export interface ErrorBoundaryProps {
  children: ReactNode

}

export interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor (props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <PageError/>
    }

    return this.props.children
  }
}
