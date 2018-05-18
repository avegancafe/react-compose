import React from 'react'

export default function compose(componentOptions) {
  return ({ children }) => {
    const ComposedComponents = componentOptions.reduceRight(
      (ComposedChildren, { component: ParentComponent, props }) =>
        function ComposedWrapper(intermediateProps) {
          return (
            <ParentComponent __composedArgs={intermediateProps.__composedArgs}>
              {(...parentArgs) => (
                <ComposedChildren
                  {...{ ...props, ...intermediateProps }}
                  __composedArgs={[
                    ...(parentArgs || []),
                    ...(intermediateProps.__composedArgs || [])
                  ]}
                >
                  {React.Children.map(intermediateProps.children, child => {
                    return (
                      <child.type
                        {...child.props}
                        __composedArgs={parentArgs}
                      />
                    )
                  })}
                </ComposedChildren>
              )}
            </ParentComponent>
          )
        },
      function initial(...args) {
        return children(args)
      }
    )

    return <ComposedComponents />
  }
}