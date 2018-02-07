import React from "react"
import Markdown from "react-rich-markdown"

export default class EntryViewer extends React.Component {
    render() {
        const {entry} = this.props
        if (entry) {
            return <div>
                    <h4>{entry.title} <small>{entry.created}</small></h4>
                    <Markdown source={entry.detail} options={{sh: false, math: false}}/>
                <p><small>{entry.user.name}</small></p>
            </div>
        } else {
            return <p>Loading</p>
        }
    }
}