import React from 'react'

export default function compose(componentOptions) {
  return ({ children }) => {
    const ComposedComponents = componentOptions.reduceRight(
      ((ComposedChildren, ComponentInstance) =>
        function ComposedWrapper(intermediateProps) {
          return React.cloneElement(
            ComponentInstance,
            ComponentInstance.props,
            (...parentArgs) => (
              <ComposedChildren
                __composedArgs={[
                  ...(parentArgs || []),
                  ...(intermediateProps.__composedArgs || [])
                ]}
              >
                {React.Children.map(intermediateProps.children, child => {
                  return <child.type __composedArgs={parentArgs} />
                })}
              </ComposedChildren>
            )
          )
        }),
      function initial({ __composedArgs }) {
        return children([...__composedArgs.reverse()])
      }
    )

    return <ComposedComponents />
  }
}
