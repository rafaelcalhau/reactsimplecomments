import React from 'react'
import { mount, shallow } from 'enzyme'
import { NewComment } from './NewComment'
import { Button } from 'semantic-ui-react'

describe('<NewComment />', () => {
    it('should handle changes on textarea', () => {

        const event = {
            target: { value: 'test'}
        }
        const handleNewComment = jest.fn()
        const wrapper = shallow(<NewComment handleNewComment={handleNewComment} />)

        expect(wrapper.find('textarea').length).toEqual(1)
        wrapper.find('textarea').simulate('change', event)

        expect(handleNewComment.mock.calls.length).toEqual(1)

    })

    
    it('should call send comment on button click', () => {

        const handleNewComment = jest.fn()
        const sendComment = jest.fn();

        const event = {
            target: { value: 'testing...'}
        }
        const wrapper = mount(
            <NewComment 
                newComment={event.target.value}
                sendComment={sendComment} 
                handleNewComment={handleNewComment} />)

        wrapper.find('textarea').simulate('change', event)
        wrapper.find(Button).simulate('click')
        
        expect(sendComment).toBeCalled()
        expect(sendComment).toBeCalledWith('testing...')
        expect(sendComment.mock.calls[0].toString()).toBe('testing...')

    })
})