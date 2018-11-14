import React, { Component, Fragment } from 'react'
import { mount } from 'enzyme'

import compose from '../index.js'

let wrapper

describe('#compose', () => {
  describe('with an empty array', () => {
    it('errors out', (done) => {
      const tmp = console.error;
      console.error = () => null

      try {
        mounted = mount(<AppWithoutRenderers />)
      } catch (e) {
        done()
      } finally {
        console.error = tmp
      }
    })
  })

  describe('with a list of component instances', () => {
    beforeEach(() => {
      wrapper = mount(<AppWithRenderers />)
    })

    it('passes args through to render function in order', () => {
      const expectedArgs = [
        props.mousePosition,
        props.subscription,
        props.validate
      ]

      expect(composedChildMock).toHaveBeenCalledWith(expectedArgs)
      expect(wrapper).toMatchSnapshot()
    })
  })
})

/* Fixtures */

const props = {
  mousePosition: { x: 300, y: 427 },
  subscription: { data: ["note 1", "note 2"] },
  validate: { predicate: x => (x < 10) }
}

const MousePosition = ({ children }) => (
  <Fragment>{children(props.mousePosition)}</Fragment>
)

const Subscription = ({ children }) => (
  <Fragment>{children(props.subscription)}</Fragment>
)

const Validate = ({ children }) => (
  <Fragment>{children(props.validate)}</Fragment>
)

const ComposedComponentWithRenderers = compose([
  <MousePosition relative={true} />,
  <Subscription url="/api/notes" />,
  <Validate />
])

const ComposedComponentWithoutRenderers = compose([])

const composedChildMock = jest.fn(() => <div>hi</div>)

const AppWithRenderers = () => (
  <ComposedComponentWithRenderers>
    {composedChildMock}
  </ComposedComponentWithRenderers>
)

const AppWithoutRenderers = () => (
  <ComposedComponentWithoutRenderers>
    {composedChildMock}
  </ComposedComponentWithoutRenderers>
)

