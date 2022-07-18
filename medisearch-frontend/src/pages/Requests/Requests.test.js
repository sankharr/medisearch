import { getByText } from "@testing-library/dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Requests from "./Requests";

test("checking the page title", () => {
  render(<Requests />);

  //   expect(screen.queryByTestId('not-empty')).not.toBeEmptyDOMElement()
//   screen.debug();
  //   expect(screen.getByText('Requests')).toBeVisible()
});

// test('loads and displays greeting', async () => {
//     render(<Fetch url="/greeting" />)

//     fireEvent.click(screen.getByText('Load Greeting'))

//     await waitFor(() => screen.getByRole('heading'))

//     expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//     expect(screen.getByRole('button')).toBeDisabled()
//   })
