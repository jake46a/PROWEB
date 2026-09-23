import fs from 'fs';
import path from 'path';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  url?: string;
  serviceTrack: string;
  notes?: string;
  scopeSummary?: string;
  assignedArchitect: string;
  priority: 'Small Business Priority' | 'Fast-Track Launch' | 'Standard Advisory' | 'Enterprise Tier 1' | 'Commercial Fast-Track';
  status: 'Pending Review' | 'Architect Assigned' | 'Discovery Scheduled';
  slaResponseTarget: string;
  createdAt: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

const SEED_INQUIRIES: Inquiry[] = [
  {
    id: 'PRO-INQ-849201',
    name: 'Tom Miller (Apex HVAC & Plumbing)',
    email: 'tom@apexhvac-service.com',
    url: 'https://apexhvac-service.com',
    serviceTrack: 'Custom AI Dispatch & Booking Web App [10 Days / $3,200]',
    notes: 'Need an online quote estimator where clients describe furnace/AC issues and Gemini drafts preliminary estimates. Eliminating 15 hours/week of phone tag.',
    assignedArchitect: 'Elena Rostova (Lead Small Business Architect)',
    priority: 'Small Business Priority',
    status: 'Discovery Scheduled',
    slaResponseTarget: '< 2 Hours',
    createdAt: '2026-09-23T09:14:00.000Z',
  },
  {
    id: 'PRO-INQ-631742',
    name: 'Dr. Emily Vance (Coastline Family Dental)',
    email: 'emily@coastlinedental.org',
    url: 'https://coastlinedental.org',
    serviceTrack: 'WordPress to Next.js Modernization + AI Intake [7 Days / $2,400]',
    notes: 'Migrating 8-year-old bloated WordPress site to a blazing-fast decoupled web app with digital patient intake forms. Current site takes 6.2s to load.',
    assignedArchitect: 'Marcus Vance (Principal Architect)',
    priority: 'Fast-Track Launch',
    status: 'Architect Assigned',
    slaResponseTarget: '< 4 Hours',
    createdAt: '2026-09-22T16:30:00.000Z',
  },
  {
    id: 'PRO-INQ-392810',
    name: 'Julian Harris (Heritage Coffee Roasters)',
    email: 'julian@heritagecoffeeroasters.com',
    url: 'https://heritagecoffeeroasters.com',
    serviceTrack: 'Decoupled WooCommerce Store + Gemini Smart Search [14 Days / $4,800]',
    notes: 'WooCommerce site crashing on holiday promotions. Decoupling frontend into Next.js edge storefront with Google AI Studio smart bean matching quiz.',
    assignedArchitect: 'Devon Lee (Edge Engineering Lead)',
    priority: 'Small Business Priority',
    status: 'Pending Review',
    slaResponseTarget: '< 4 Hours',
    createdAt: '2026-09-23T07:45:00.000Z',
  },
];

export function getInquiries(): Inquiry[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(INQUIRIES_FILE)) {
      const content = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading inquiries:', err);
  }
  saveInquiries(SEED_INQUIRIES);
  return SEED_INQUIRIES;
}

export function saveInquiries(inquiries: Inquiry[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving inquiries:', err);
  }
}
