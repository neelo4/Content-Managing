//for all categories
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../test-utils/renderWithProviders';
import FaqSection from './FaqSection';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockContactUsUplift = {
  categories: {
    policies: [
      {
        question: "How do I add a driver to my car insurance policy?",
        answer: "1. Go to the $t(pages.contactUsUplift.internalLinks.policies) page or the $t(pages.contactUsUplift.internalLinks.home) page \n2. Find your policy and select View policy \n3. Locate the asset you wish to change and select See more details. \n4. Scroll to Edit listed drivers \n5. Enter the date you wish to add them from \n6. Click Add driver \n7. Enter the new driver's details and click Save \n8. If you need to make an additional payment to add this driver, press Continue to payment and enter your payment details.",
      },
      {
        question: "How do I change the car on my policy?",
        answer: "In general, you'll need to call us on $t(constants.phoneNumbers.generalEnquiries){data-tracking-name=faq-policies-change-car} in order to change the car on your motor policy.",
      },
    ],
    quotes: [
      {
        question: "For my home claim, do I need to organise quotes for my home or contents?",
        answer: "NRMA Insurance has partnered with a number of leading retailers and licensed repairers to take the hassle out of you having to obtain quotes. \n\n In most cases you won't need to get quotes, but if we need you to, we'll contact you to let you know.",
      },
      {
        question: "How can I decide how much to insure my home and contents for?",
        answer: "We want to help you make sure you've got enough insurance to cover everything you want to cover. If you don't have enough, you may not be able to rebuild your home the way you want, or replace all your items. Our home and contents calculators{target=_blank} are one tool that can help. Just remember that they're a guide only, and provide a possible sum insured range. The final decision on the sum insured amount is yours, as we're unable to guarantee that all information in the calculator is up to date or accurate. They might also differ from any estimates we provide as part of your quote",
      },
    ],
    renewals: [
      {
        question: "Can I renew policies held by someone who's recently passed away?",
        answer: "If the estate has been finalised and there's a new owner, then they must take out a policy in their name. \n\n If the estate hasn't been finalised the policy can be renewed. \n\nOnce the estate has been finalised, you'll need to inform us. \n\nTo learn more, visit our deceased estate page{target=_blank data-tracking-name=faq-renewals-deceased-estate}",
      },
      {
        question: "My NSW CTP Green Slip renewal isn't due for several weeks, can I pay now?",
        answer: "If you want to pay for your NSW CTP Green Slip renewal more than 42 days before it's due, call us on $t(constants.phoneNumbers.generalEnquiries){data-tracking-name=faq-renewals-green-slip} or visit us at your local branch{target=_blank data-tracking-name=faq-renewals-green-slip}.",
      },
    ],
    roadsideAssistance: [
      {
        question: "How do I renew my membership with NRMA*?",
        answer: "To renew your membership online, visit NRMA{target=_blank data-tracking-name=faq-roadside-assistance-membership} or renew using BPAY. \n\n You can also renew by calling us on $t(constants.phoneNumbers.generalEnquiries){data-tracking-name=faq-roadside-assistance-membership}, visiting one of our branches or your nearest Australia Post office. \n\n National Roads and Motorists' Association Limited, ABN 77 000 010 506, trading as NRMA, is a separate and independent company from Insurance Australia Limited, ABN 11 000 016 722, trading as NRMA Insurance. "NRMA" provides Membership, the "my nrma app" and other services.",
      },
      {
        question: "Is roadside assistance included in my policies?",
        answer: "No, roadside assistance is not included in our policies. \n\n For more information about NRMA visit www.mynrma.com.au{target=_blank} or call 131 122{data-tracking-name=faq-roadside-assistance-my-policies}. \n\n* National Roads and Motorists' Association Limited, ABN 77 000 010 506, trading as NRMA, is a separate and independent company from Insurance Australia Limited, ABN 11 000 016 722, trading as NRMA Insurance. "NRMA" provides Membership, the "my nrma app" and other services.",
      },
    ],
  },
};

jest.mock('@iag-common/iag-brand-context', () => ({
  ...jest.requireActual('@iag-common/iag-brand-context'),
  tt: jest.fn(() => mockContactUsUplift),
}));

describe('FaqSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Policies tests
  test('renders correct number of FAQ items for policies', () => {
    render(<FaqSection />);
    const policyQuestions = screen.getAllByText(/How do I (add|change)/);
    expect(policyQuestions).toHaveLength(2);
  });

  test('expands and collapses policy FAQ items when clicked', () => {
    render(<FaqSection />);
    const firstPolicyQuestion = screen.getByText("How do I add a driver to my car insurance policy?");
    
    expect(screen.queryByText(/1. Go to the/)).not.toBeInTheDocument();
    fireEvent.click(firstPolicyQuestion);
    expect(screen.getByText(/1. Go to the/)).toBeInTheDocument();
    fireEvent.click(firstPolicyQuestion);
    expect(screen.queryByText(/1. Go to the/)).not.toBeInTheDocument();
  });

  // Quotes tests
  test('renders correct number of FAQ items for quotes', () => {
    render(<FaqSection />);
    const quoteQuestions = screen.getAllByText(/For my home claim|How can I decide/);
    expect(quoteQuestions).toHaveLength(2);
  });

  test('displays correct answer for quote FAQ item', () => {
    render(<FaqSection />);
    const quoteQuestion = screen.getByText("How can I decide how much to insure my home and contents for?");
    fireEvent.click(quoteQuestion);
    expect(screen.getByText(/We want to help you make sure you've got enough insurance/)).toBeInTheDocument();
  });

  // Renewals tests
  test('renders correct number of FAQ items for renewals', () => {
    render(<FaqSection />);
    const renewalQuestions = screen.getAllByText(/Can I renew policies|My NSW CTP Green Slip/);
    expect(renewalQuestions).toHaveLength(2);
  });

  test('displays correct answer for renewal FAQ item', () => {
    render(<FaqSection />);
    const renewalQuestion = screen.getByText("Can I renew policies held by someone who's recently passed away?");
    fireEvent.click(renewalQuestion);
    expect(screen.getByText(/If the estate has been finalised and there's a new owner/)).toBeInTheDocument();
  });

  // Roadside Assistance tests
  test('renders correct number of FAQ items for roadside assistance', () => {
    render(<FaqSection />);
    const roadsideQuestions = screen.getAllByText(/How do I renew my membership|Is roadside assistance included/);
    expect(roadsideQuestions).toHaveLength(2);
  });

  test('displays correct answer for roadside assistance FAQ item', () => {
    render(<FaqSection />);
    const roadsideQuestion = screen.getByText("Is roadside assistance included in my policies?");
    fireEvent.click(roadsideQuestion);
    expect(screen.getByText(/No, roadside assistance is not included in our policies./)).toBeInTheDocument();
  });
});
