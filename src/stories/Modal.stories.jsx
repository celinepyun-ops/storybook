import { fn } from 'storybook/test';
import { Modal } from './Modal';
import { Button } from './Button';

export default {
  title: 'Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: {
    isOpen: true,
    title: 'Confirm Action',
    onClose: fn(),
    children: 'Are you sure you want to archive this campaign? This action can be undone later.',
    footer: (
      <>
        <Button variant="outline" label="Cancel" />
        <Button variant="primary" label="Confirm" />
      </>
    ),
  },
};

export const Small = {
  args: {
    isOpen: true,
    title: 'Delete Brand',
    size: 'sm',
    onClose: fn(),
    children: 'This will permanently delete the brand from your list.',
    footer: (
      <>
        <Button variant="outline" label="Cancel" />
        <Button variant="danger" label="Delete" />
      </>
    ),
  },
};

export const Large = {
  args: {
    isOpen: true,
    title: 'Campaign Details',
    size: 'lg',
    onClose: fn(),
    children: (
      <div>
        <p>Campaign: <strong>Amazon Q1 Brand Outreach</strong></p>
        <p>This campaign targets 500 brands across health, beauty, and home categories. Outreach began on January 15, 2026, and is scheduled to conclude on March 31, 2026.</p>
        <p>Current response rate is 24.3% with 145 positive replies received so far.</p>
      </div>
    ),
  },
};
