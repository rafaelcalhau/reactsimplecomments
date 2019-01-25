import React from 'react'
import { mount, shallow } from 'enzyme'
import NewComment from './NewComment'
import { Button } from 'semantic-ui-react'

describe('<NewComment />', () => {
    it('should handle changes on textarea', () => {

        const event = {
            target: { value: 'test'}
        }
        const wrapper = shallow(<NewComment />)

        wrapper.find('textarea').simulate('change', event)
        expect(wrapper.state().newComment).toBe('test')

    })

    it('should call send comment on button click', () => {

        // Let's create a mock function
        const sendComment = jest.fn();
        //

        const event = {
            target: { value: 'testing...'}
        }
        const wrapper = mount(<NewComment sendComment={sendComment} />)

        expect(wrapper.state().newComment).toBe('')

        wrapper.find('textarea').simulate('change', event)
        expect(wrapper.state().newComment).toBe('testing...')

        wrapper.find(Button).simulate('click')
        expect(wrapper.state().newComment).toBe('')
        
        expect(sendComment).toBeCalled()
        expect(sendComment).toBeCalledWith('testing...')
        expect(sendComment.mock.calls[0].toString()).toBe('testing...')

    })
})