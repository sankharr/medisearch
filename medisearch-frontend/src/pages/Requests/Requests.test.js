import {screen, getByText} from '@testing-library/dom'
import { render } from 'react-dom'

test('checking the page title', () => {
    // render()

//   expect(screen.queryByTestId('not-empty')).not.toBeEmptyDOMElement()
  expect(screen.getByTestId('mainTitle')).toBeVisible()
})