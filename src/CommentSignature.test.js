import React from 'react'
import { render } from 'enzyme'
import CommentSignature from './CommentSignature'

describe('<CommentSignature />', () => {
    it('should render without props', () => {

        const wrapper = render(<CommentSignature />)

        expect(wrapper.find('.sentBy small').length).toEqual(1)
        expect(wrapper.find('.sentBy small').text()).toBe('Sent by ...')

    })

    it('should render with props', () => {

        const email = 'rafael@calhau.me'
        const wrapper = render(<CommentSignature email={email} />)

        expect(wrapper.find('.sentBy small').length).toEqual(1)
        expect(wrapper.find('.sentBy small').text()).toBe(`Sent by ${email}`)

    })
})