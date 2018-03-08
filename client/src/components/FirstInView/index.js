import React, { Component } from 'react'
import ReactDom from 'react-dom'

var Instance = []
var pending = []

function handler () {
    Instance.forEach((component) => {
        if (!component.visible && checkInView(component)) {
            pending.push(component)
            component.visible = true
            component.props.onFirstInView(component)
        }
    })

    purgePending()
}

function purgePending () {
    pending.forEach((component, i) => {
        var index = Instance.indexOf(component)
        if (index > -1) {
            Instance.splice(index, 1)
        }
    })
}


/**
 * 判断component是否在可视范围内
 * @param component
 * @returns {boolean}
 */
function checkInView (component) {
    var element = ReactDom.findDOMNode(component)
    var coords = element.getBoundingClientRect()
    if (coords.top >= 0 && coords.top <= (window.innerHeight || document.documentElement.clientHeight)) {
        return true
    }
    if (coords.bottom >= 0 && coords.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
        return true
    }
    return false

}


module.exports = class FirstInView extends Component {

    componentDidMount () {
        if (Instance.length === 0) {
            window.addEventListener('scroll', handler)
        }

        Instance.push(this)
        handler()
    }

    componentWillUnmount () {
        var index = Instance.indexOf(this)
        if (index !== -1) {
            Instance.splice(index, 1)
        }

        if (Instance.length === 0) {
            window.removeEventListener('scroll', handler)
        }
    }

    render () {
        return this.props.children
    }
}
