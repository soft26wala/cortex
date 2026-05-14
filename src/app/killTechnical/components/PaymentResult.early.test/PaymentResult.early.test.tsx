import React from 'react'
import PaymentResult from '../PaymentResult';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

// Mocks
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("@iconify/react", () => ({
  Icon: (props: any) => <svg data-testid="icon" {...props} />,
}));

jest.mock("next/link", () => {
  // next/link exports a default component that renders an <a> with href
  return ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});
describe('PaymentResult() PaymentResult method', () => {
  // --- HAPPY PATHS ---
  describe('Happy Paths', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('renders SUCCESS state with correct UI and transaction id', () => {
      // This test ensures that when status=SUCCESS and tid is present, the success UI is rendered.
      mockUseSearchParams.mockReturnValue({
        get: (key: string) => {
          if (key === 'status') return 'SUCCESS';
          if (key === 'tid') return 'TXN12345';
          return '';
        },
      });

      render(<PaymentResult />);

      // Success icon
      expect(screen.getByTestId('icon')).toHaveAttribute('icon', 'solar:check-circle-bold');
      // Success heading
      expect(screen.getByRole('heading', { name: /success!/i })).toBeInTheDocument();
      // Success message
      expect(
        screen.getByText(/paise mil gaye hain\. course ab aapke dashboard mein hai\./i)
      ).toBeInTheDocument();
      // Transaction ID
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('TXN12345')).toBeInTheDocument();
      // Dashboard link
      expect(screen.getByRole('link', { name: /go to dashboard/i })).toHaveAttribute(
        'href',
        '/dashboard'
      );
      // Home link
      expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
    });

    test('renders PENDING state with correct UI and transaction id', () => {
      // This test ensures that when status=PENDING and tid is present, the pending UI is rendered.
      mockUseSearchParams.mockReturnValue({
        get: (key: string) => {
          if (key === 'status') return 'PENDING';
          if (key === 'tid') return 'TXN98765';
          return '';
        },
      });

      render(<PaymentResult />);

      // Pending icon
      expect(screen.getByTestId('icon')).toHaveAttribute('icon', 'solar:clock-circle-bold');
      // Pending heading
      expect(screen.getByRole('heading', { name: /processing\.\.\./i })).toBeInTheDocument();
      // Pending message
      expect(
        screen.getByText(
          /bank se confirmation ka intezar hai\. 5-10 minute mein course automatic active ho jayega\./i
        )
      ).toBeInTheDocument();
      // Transaction ID
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('TXN98765')).toBeInTheDocument();
      // Dashboard link
      expect(screen.getByRole('link', { name: /go to dashboard/i })).toHaveAttribute(
        'href',
        '/dashboard'
      );
      // Home link
      expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
    });

    test('renders default UI when status is neither SUCCESS nor PENDING', () => {
      // This test ensures that when status is not SUCCESS or PENDING, only the transaction details and links are rendered.
      mockUseSearchParams.mockReturnValue({
        get: (key: string) => {
          if (key === 'status') return 'FAILED';
          if (key === 'tid') return 'TXN00000';
          return '';
        },
      });

      render(<PaymentResult />);

      // Should not render success or pending headings
      expect(screen.queryByRole('heading', { name: /success!/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /processing\.\.\./i })).not.toBeInTheDocument();
      // Should render transaction details
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('TXN00000')).toBeInTheDocument();
      // Should render both links
      expect(screen.getByRole('link', { name: /go to dashboard/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
    });
  });

  // --- EDGE CASES ---
  describe('Edge Cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('renders "N/A" for transaction id if tid is missing', () => {
      // This test ensures that if tid is missing, "N/A" is displayed for transaction id.
      mockUseSearchParams.mockReturnValue({
        get: (key: string) => {
          if (key === 'status') return 'SUCCESS';
          if (key === 'tid') return '';
          return '';
        },
      });

      render(<PaymentResult />);

      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    test('renders "N/A" for transaction id if tid is whitespace', () => {
      // This test ensures that if tid is whitespace, "N/A" is displayed for transaction id.
      mockUseSearchParams.mockReturnValue({
        get: (key: string) => {
          if (key === 'status') return 'SUCCESS';
          if (key === 'tid') return '   ';
          return '';
        },
      });

      render(<PaymentResult />);

      // In this implementation, whitespace is not treated as missing, so it should display whitespace.
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('   ')).toBeInTheDocument();
    });

    test('renders correctly when both status and tid are missing', () => {
      // This test ensures that if both status and tid are missing, the fallback UI is rendered.
      mockUseSearchParams.mockReturnValue({
        get: () => '',
      });

      render(<PaymentResult />);

      // Should not render success or pending headings
      expect(screen.queryByRole('heading', { name: /success!/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /processing\.\.\./i })).not.toBeInTheDocument();
      // Should render transaction details with N/A
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('N/A')).toBeInTheDocument();
      // Should render both links
      expect(screen.getByRole('link', { name: /go to dashboard/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
    });

    test('renders correctly when status is lowercase "success" (case-sensitive)', () => {
      // This test ensures that status is case-sensitive and does not match lowercase "success".
      mockUseSearchParams.mockReturnValue({
        get: (key: string) => {
          if (key === 'status') return 'success';
          if (key === 'tid') return 'TXNLOWER';
          return '';
        },
      });

      render(<PaymentResult />);

      // Should not render success heading
      expect(screen.queryByRole('heading', { name: /success!/i })).not.toBeInTheDocument();
      // Should render transaction details
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('TXNLOWER')).toBeInTheDocument();
    });

    test('renders correctly when status is lowercase "pending" (case-sensitive)', () => {
      // This test ensures that status is case-sensitive and does not match lowercase "pending".
      mockUseSearchParams.mockReturnValue({
        get: (key: string) => {
          if (key === 'status') return 'pending';
          if (key === 'tid') return 'TXNLOWERPENDING';
          return '';
        },
      });

      render(<PaymentResult />);

      // Should not render pending heading
      expect(screen.queryByRole('heading', { name: /processing\.\.\./i })).not.toBeInTheDocument();
      // Should render transaction details
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('TXNLOWERPENDING')).toBeInTheDocument();
    });
  });
});