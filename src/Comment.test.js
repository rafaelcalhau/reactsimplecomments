import React from 'react'
import Comment from './Comment'
import { render } from 'enzyme'

// Note: create-react-app already provide Jest (test runner)
it('should render text', () => {

    const comment = {
        comment: '1'
    }
    const wrapper = render(<Comment node={comment} />)
    expect(wrapper.text()).toBe('1')

})

it('should render empty', () => {

    const comment = {
        comment: ''
    }
    const wrapper = render(<Comment node={comment} />)
    expect(wrapper.text()).toBe('-')

})

it('should render without props', () => {

    const wrapper = render(<Comment />)
    expect(wrapper.text()).toBe('-')

})