import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalProvider from './ModalProvider';
import Modal from './Modal';
import App from ".../pages/App"



describe('test', () => {
  test("display console", () => {
    render(
      <App>

      </App>
    )
    expect(logMsg).toBe("jest");

  })
})



describe('Modal component', () => {
  test('renders the modal correctly when open', () => {
    render(
      <ModalProvider>
        <Modal
          open={true}
          mode="info"
          title="Test Modal"
          subChildren={<div data-testid="modal-content">Test Content</div>}
          onClose={() => true}
          enableFadeIn={true}
          enableFadeOut={true}
        />
      </ModalProvider>
    );

    // Check if the modal is visible
    expect(screen.getByTestId('modal-main')).toBeVisible();

    // Check if the title is displayed
    expect(screen.getByText('Test Modal')).toBeInTheDocument();

    // Check if the content is displayed
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();

    // Check if the close button is displayed
    expect(screen.getByText('⨯')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn(() => true);

    render(
      <ModalProvider>
        <Modal
          open={true}
          mode="info"
          title="Test Modal"
          onClose={onCloseMock}
          enableFadeIn={true}
          enableFadeOut={true}
        />
      </ModalProvider>
    );

    // Click the close button
    fireEvent.click(screen.getByText('⨯'));

    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('calls onClosed after modal is closed with fade out', () => {
    const onClosedMock = jest.fn();

    render(
      <ModalProvider>
        <Modal
          open={true}
          mode="info"
          title="Test Modal"
          onClose={() => true}
          onClosed={onClosedMock}
          enableFadeIn={true}
          enableFadeOut={true}
        />
      </ModalProvider>
    );

    // Click the close button
    fireEvent.click(screen.getByText('⨯'));

    // Wait for fade out animation to finish
    setTimeout(() => {
      // Check if onClosed was called
      expect(onClosedMock).toHaveBeenCalled();
    }, 1000);
  });

  // Add more test cases as needed...
});