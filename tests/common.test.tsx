import * as React from 'react'
import { render } from '@testing-library/react'
import 'jest-canvas-mock'

import { DnDMaker } from '../src'

describe('render', () => {
  it('renders without crashing', () => {
    render(<DnDMaker defaultItems={[]} groups={[]} />)
  })
})
