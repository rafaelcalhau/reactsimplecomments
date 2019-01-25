import React from 'react'
import { shallow } from 'enzyme'
import Comments from './Comments'
import Comment from './Comment'

// it mounts the component in a shallow manner
// and doesn't render it's child components

describe('<Comments />', () => {
    it('should render Comments', () => {

        const comments = {
            a: { comment: '1' },
            b: { comment: '2' },
        }

        const wrapper = shallow(<Comments comments={comments} />);

        expect(wrapper.find(Comment).length).toBe(2)
        expect(wrapper.find(Comment).get(0).props.node).toBe(comments.a)
        expect(wrapper.find(Comment).get(1).props.node).toBe(comments.b)
        expect(wrapper.find(Comment).get(0).key).toBe(Object.keys(comments)[0])

    })

    it('should work with no Comments', () => {

        const comments = {}
        const wrapper = shallow(<Comments comments={comments} />);

        expect(wrapper.find(Comment).length).toBe(0)

    })
})