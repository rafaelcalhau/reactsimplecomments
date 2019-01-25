import React from 'react'
import { mount, shallow } from 'enzyme'
import App from './App'
import Comments from './Comments'
import NewComment from './NewComment'
import Comment from './Comment'
import { EventEmitter } from 'events'

describe('<App />', () => {

  it('renders without crashing', () => {

    const auth = { onAuthStateChanged: jest.fn() }
    const database = { ref: jest.fn() }

    auth.onAuthStateChanged.mockReturnValue({
      uid: 1,
      email: 'email@test.com'
    })
    
    database.ref.mockReturnValue({
      on: jest.fn()
    })

    const wrapper = shallow(<App auth={auth} database={database} />)

    expect(wrapper.find(NewComment).length).toBe(0)
    expect(wrapper.find(Comments).length).toBe(1)
    expect(wrapper.find('p').length).toBe(1)

  });

  it('adds a new comment', () => {

    const auth = { onAuthStateChanged: jest.fn() }
    const database = { ref: jest.fn() }
    const child = jest.fn()
    const push = jest.fn();
    const update = jest.fn();

    auth.onAuthStateChanged.mockReturnValue({
      uid: 1,
      email: 'email@test.com'
    })

    database.ref.mockReturnValue({
      child,
      update,
      on: jest.fn()
    })

    child.mockReturnValue({ push })
    push.mockReturnValue({ key: 1 })

    const wrapper = shallow(<App auth={auth} database={database} />)
    wrapper.instance().sendComment('new comment during a test')
    expect(child).toBeCalledWith('comments')
    expect(update).toBeCalledWith({
      'comments/1' : {
        comment: 'new comment during a test',
        "email": null,
        "userId": null
      }
    })

  });

  it('renders comments from database', async () => {

    const auth = { 
      onAuthStateChanged: jest.fn(),
      signInWithEmailAndPassword: (email, password) => {
        return {
          additionalUserInfo: {
            user: { uid: 1, email: email }
          }
        }
      }
    }

    const database = { ref: jest.fn() }
    const eventEmitter = new EventEmitter()

    auth
      .onAuthStateChanged.mockReturnValue({
        uid: 1,
        email: 'email@test.com'
      })

    database.ref.mockReturnValue(eventEmitter)
    
    const wrapper = mount(<App auth={auth} database={database} />)

    // didn't get any comments
    expect(wrapper.state().isLoading).toBeTruthy()
    expect(wrapper.find(NewComment).length).toBe(0)
    expect(wrapper.find(Comments).length).toBe(1)
    expect(wrapper.find('p').length).toBe(1)

    // getting comments
    const comments = {
      a: { comment: 'Comment 1', "email": null, "userId": null },
      b: { comment: 'Comment 2', "email": null, "userId": null }
    }
    
    const val = jest.fn();
    val.mockReturnValue(comments)

    const snapshot = { val }
    eventEmitter.emit('value', snapshot)

    // We can update the shallowed component based on its current state
    wrapper.update()

    // tests
    expect(wrapper.state().isLoading).toBeFalsy()
    expect(wrapper.find('p').length).toBe(0)
    expect(Object.keys(wrapper.state().comments).length).toBe(2)
    expect(wrapper.state().comments.a).toBe(comments.a)
    expect(wrapper.state().comments).toBe(comments)
    expect(wrapper.find(Comments).get(0).props.comments).toBe(comments)
    expect(wrapper.find(Comment).length).toBe(2)
    expect(wrapper.state().isLoggedIn).toBeFalsy()

    await wrapper.instance().login('rafael@calhau.me', '123123')

    // We can update the shallowed component based on its current state
    wrapper.update()

    expect(wrapper.state().isLoggedIn).toBeTruthy()
    expect(wrapper.find(NewComment).length).toBe(1)
    expect(wrapper.find(NewComment).get(0).props.sendComment).toBe(wrapper.instance().sendComment)

  });

})
