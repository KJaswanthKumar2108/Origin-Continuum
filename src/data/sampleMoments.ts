import { ContinuumMoment } from '../types';

export interface ScenarioDefinition {
  id: string;
  name: string;
  category: 'project' | 'meeting' | 'lecture' | 'client' | 'reminder';
  tag: string;
  description: string;
  moment: ContinuumMoment;
}

export const SCENARIO_Q3_PRODUCT_PLAN: ContinuumMoment = {
  id: 'moment-q3-plan',
  title: 'Q3 Product Plan',
  timestamp: 'Captured just now',
  createdAt: Date.now() - 2 * 60 * 1000,
  sources: [
    { type: 'whiteboard', label: 'Whiteboard' },
    { type: 'voice', label: 'Voice Context' },
  ],
  actions: [
    { id: 'act-q3-1', title: 'Finish prototype', completed: false, priority: 'high' },
    { id: 'act-q3-2', title: 'Review pricing', completed: false, priority: 'medium' },
    { id: 'act-q3-3', title: 'Prepare investor deck', completed: false, priority: 'high' },
  ],
  deadline: 'Friday',
  contextSummary:
    'Q3 product planning tasks captured from the strategy whiteboard and voice intent.',
  voiceTranscript: 'Q3 product plan. I need to finish this by Friday.',
  extractedText: 'MEETING ROOM 3B\n• Finish prototype\n• Review pricing\n• Prepare investor deck\n• Deadline: Friday',
  entities: ['Product Team', 'Investors'],
  decisions: [
    'Focus sprint entirely on prototype validation before final pricing review.',
  ],
  unresolvedQuestions: [
    'Confirm if tier 2 volume discounts should be included in the Friday deck.',
  ],
  suggestedNextAction: {
    action: 'Finish prototype animations before reviewing final pricing numbers.',
    reasoning: 'Prototype interaction flow grounds the pricing value proposition needed for the deck.',
  },
  scenarioCategory: 'project',
  visualData: {
    title: 'Q3 PRODUCT PLAN',
    subtitle: 'MEETING ROOM 3B • LIVE STRATEGY',
    badge: 'WHITEBOARD',
    points: [
      '• Finish prototype',
      '• Review pricing',
      '• Prepare investor deck',
      '• Deadline: Friday',
    ],
    footerNote: 'Captured with iQOO Optical OCR Matrix',
    accentColor: '#FFE600',
  },
  isDemo: true,
  isAIGenerated: false,
};

export const SCENARIOS: ScenarioDefinition[] = [
  {
    id: 'scenario-q3-plan',
    name: 'A. Q3 Product Plan',
    category: 'project',
    tag: 'Project Management',
    description: 'Sprint roadmap, prototype review, and investor deck delivery.',
    moment: SCENARIO_Q3_PRODUCT_PLAN,
  },
  {
    id: 'scenario-meeting-notes',
    name: 'B. Meeting Notes',
    category: 'meeting',
    tag: 'Action Extraction',
    description: 'Architecture sync, API contracts, task owners, and decision logs.',
    moment: {
      id: 'moment-meeting-notes',
      title: 'Platform Architecture Sync',
      timestamp: 'Today, 10:15 AM',
      createdAt: Date.now() - 45 * 60 * 1000,
      sources: [
        { type: 'document', label: 'Notepad' },
        { type: 'voice', label: 'Voice Memo' },
      ],
      actions: [
        { id: 'act-m-1', title: 'Finalize v2 GraphQL schema contract', completed: false, assignee: 'Sarah', priority: 'high' },
        { id: 'act-m-2', title: 'Benchmark Redis latency on read replicas', completed: false, assignee: 'Alex', priority: 'medium' },
        { id: 'act-m-3', title: 'Schedule load testing run for Tuesday', completed: true, assignee: 'DevOps', priority: 'high' },
      ],
      deadline: 'Tuesday 2 PM',
      contextSummary:
        'Technical sync regarding v2 backend architecture, federation contracts, and latency benchmarks.',
      voiceTranscript:
        'Sprint architecture review with Sarah. Let’s make sure GraphQL contract is finalized and load testing happens by Tuesday.',
      extractedText:
        'ARCH REVIEW\n- Schema contract: Sarah\n- Redis benchmark: Alex\n- Load test: Tuesday 2PM\n- Decision: Approved GraphQL federation',
      entities: ['Sarah (Tech Lead)', 'Alex (Backend)', 'Platform DevOps'],
      decisions: [
        'Approved GraphQL federation strategy for v2 release.',
        'Migrate cache cluster to Redis 7 with cluster mode enabled.',
      ],
      unresolvedQuestions: [
        'Will Redis caching be enabled for read-heavy authentication routes?',
      ],
      suggestedNextAction: {
        action: 'Review Sarah’s schema pull request before tomorrow’s staging deploy.',
        reasoning: 'Resolving the schema contract unblocks downstream client application teams.',
      },
      scenarioCategory: 'meeting',
      visualData: {
        title: 'ENGINEERING ARCHITECTURE SYNC',
        subtitle: 'SPRINT 44 • BACKEND TEAM',
        badge: 'MEETING NOTE',
        points: [
          '• Finalize v2 schema contract (Sarah)',
          '• Benchmark Redis replica latency (Alex)',
          '• Schedule staging load test (Tuesday 2PM)',
          '• Decision: Approved GraphQL federation',
        ],
        footerNote: 'Extracted from notebook snapshot + voice annotation',
        accentColor: '#38bdf8',
      },
      isDemo: true,
      isAIGenerated: false,
    },
  },
  {
    id: 'scenario-lecture-notes',
    name: 'C. Lecture Notes',
    category: 'lecture',
    tag: 'Learning & Study',
    description: 'Distributed systems, consensus algorithms, and study tasks.',
    moment: {
      id: 'moment-lecture-notes',
      title: 'Distributed Systems: Raft Consensus',
      timestamp: 'Today, 2:30 PM',
      createdAt: Date.now() - 3 * 60 * 60 * 1000,
      sources: [
        { type: 'whiteboard', label: 'Lecture Slide' },
        { type: 'voice', label: 'Audio Note' },
      ],
      actions: [
        { id: 'act-l-1', title: 'Implement Raft leader election simulator', completed: false, priority: 'high' },
        { id: 'act-l-2', title: 'Read chapter 4 on log replication safety', completed: false, priority: 'medium' },
        { id: 'act-l-3', title: 'Complete practice problem set #3', completed: false, priority: 'high' },
      ],
      deadline: 'Next Monday 9 AM',
      contextSummary:
        'Key study notes on distributed consensus, split-brain mitigation, and term election timers.',
      voiceTranscript:
        'CS 401 lecture on Raft consensus. Focus on leader heartbeat intervals and finish problem set 3 before Monday.',
      extractedText:
        'CS 401: RAFT PROTOCOL\n1. Leader Election & Heartbeats (150-300ms)\n2. Log Matching Invariant\n3. Safety: Committed entries never overwritten\nHW: Problem Set #3 due Monday',
      entities: ['Prof. Chen', 'CS 401 Study Group'],
      decisions: [
        'Focus implementation assignment on 3-node cluster quorum.',
      ],
      unresolvedQuestions: [
        'How does Raft handle network partitions where minority partition increments term continuously?',
      ],
      suggestedNextAction: {
        action: 'Review chapter 4 log replication rules before starting problem set #3.',
        reasoning: 'Log replication invariants are directly tested in questions 2 through 5 of the problem set.',
      },
      scenarioCategory: 'lecture',
      visualData: {
        title: 'CS 401: DISTRIBUTED SYSTEMS',
        subtitle: 'HALL B • RAFT CONSENSUS ALGORITHM',
        badge: 'LECTURE NOTE',
        points: [
          '• Leader Election & Randomized Heartbeat Timers',
          '• Log Matching Invariant & Term Consistency',
          '• Safety: Committed entries never overwritten',
          '• Assignment: Problem Set #3 due Monday 9AM',
        ],
        footerNote: 'Blackboard optical scan + lecture voice note',
        accentColor: '#a855f7',
      },
      isDemo: true,
      isAIGenerated: false,
    },
  },
  {
    id: 'scenario-client-discussion',
    name: 'D. Client Discussion',
    category: 'client',
    tag: 'Business & Deals',
    description: 'Enterprise SSO, SOC2 compliance, SLA matrix, and proposal delivery.',
    moment: {
      id: 'moment-client-discussion',
      title: 'Acme Corp Enterprise Deal',
      timestamp: 'Yesterday, 4:00 PM',
      createdAt: Date.now() - 20 * 60 * 60 * 1000,
      sources: [
        { type: 'document', label: 'Client Brief' },
        { type: 'voice', label: 'Call Summary' },
      ],
      actions: [
        { id: 'act-c-1', title: 'Revise SLA commitment to 99.95% uptime', completed: true, priority: 'high' },
        { id: 'act-c-2', title: 'Prepare SOC2 Type II compliance pack for CISO', completed: false, priority: 'high' },
        { id: 'act-c-3', title: 'Send updated Statement of Work and pricing addendum', completed: false, priority: 'high' },
      ],
      deadline: 'Thursday 5 PM',
      contextSummary:
        'Negotiation takeaways from Acme Corp call regarding SAML SSO requirements and SOC2 validation.',
      voiceTranscript:
        'Client meeting with Acme Corp VP of Security. They require SAML SSO and SOC2 Type II audit report before Thursday 5 PM.',
      extractedText:
        'ACME CORP ENTERPRISE\n- SLA: 99.95% agreed\n- SSO: Okta/SAML mandatory\n- Security: SOC2 report required by CISO\n- Proposal due Thursday 5 PM',
      entities: ['Acme Corp', 'VP of Security David', 'Legal Counsel'],
      decisions: [
        'Agreed to 99.95% uptime SLA with standard credit penalties.',
        'Include Okta and Azure AD connectors in base enterprise tier.',
      ],
      unresolvedQuestions: [
        'Does Acme require dedicated multi-region data residency in the EU region?',
      ],
      suggestedNextAction: {
        action: 'Compile the SOC2 Type II security package to send with the revised Statement of Work.',
        reasoning: 'The client CISO clearance is the gating dependency for Thursday contract signing.',
      },
      scenarioCategory: 'client',
      visualData: {
        title: 'ACME CORP ENTERPRISE PROPOSAL',
        subtitle: 'SECURITY & SLA AGREEMENT MATRIX',
        badge: 'CLIENT DEAL',
        points: [
          '• Uptime SLA: 99.95% with standard credits',
          '• Authentication: SAML 2.0 / Okta Enterprise SSO',
          '• Security Requirement: SOC2 Type II report for CISO',
          '• Delivery Deadline: Thursday 5:00 PM EST',
        ],
        footerNote: 'Captured from client meeting room notes + verbal debrief',
        accentColor: '#10b981',
      },
      isDemo: true,
      isAIGenerated: false,
    },
  },
  {
    id: 'scenario-personal-reminder',
    name: 'E. Personal Reminder',
    category: 'reminder',
    tag: 'Everyday Productivity',
    description: 'Vehicle inspection, maintenance checklist, and weekend errands.',
    moment: {
      id: 'moment-personal-reminder',
      title: 'Vehicle Service & Weekend Checklist',
      timestamp: 'Yesterday, 8:00 PM',
      createdAt: Date.now() - 14 * 60 * 60 * 1000,
      sources: [
        { type: 'camera', label: 'Dashboard Receipt' },
        { type: 'voice', label: 'Voice Note' },
      ],
      actions: [
        { id: 'act-p-1', title: 'Drop car for brake pad inspection at 8:00 AM', completed: false, priority: 'high' },
        { id: 'act-p-2', title: 'Pick up HEPA cabin air filters from store', completed: false, priority: 'medium' },
        { id: 'act-p-3', title: 'Submit signed auto insurance renewal form', completed: false, priority: 'high' },
      ],
      deadline: 'Saturday 10 AM',
      contextSummary:
        'Personal weekend task list captured from car inspection advisory slip and voice memo.',
      voiceTranscript:
        'Quick weekend reminder: Drop the car off Saturday morning for brake inspection and mail the insurance renewal.',
      extractedText:
        'AUTO CARE SERVICE\n- Mileage: 42,150 mi\n- Brake wear: Front 3mm (Inspect)\n- Filter check recommended\nAppointment: Sat 8:00 AM',
      entities: ['Metro Auto Service', 'Insurance Agency'],
      decisions: [
        'Schedule early Saturday morning slot to finish errands before noon.',
      ],
      unresolvedQuestions: [
        'Check if insurance policy discount applies for multi-car bundle.',
      ],
      suggestedNextAction: {
        action: 'Fill out and sign the insurance renewal PDF tonight to drop it off Saturday.',
        reasoning: 'Renewal policy takes 24 hours to process before current coverage expires.',
      },
      scenarioCategory: 'reminder',
      visualData: {
        title: 'METRO AUTO SERVICE ADVISORY',
        subtitle: 'VEHICLE HEALTH & SERVICE SLIP',
        badge: 'RECEIPT / ADVISORY',
        points: [
          '• Scheduled Service: Brake Pad Inspection (Sat 8:00 AM)',
          '• Part Order: HEPA Cabin Air Filter replacement',
          '• Paperwork: Signed Insurance Renewal Form',
          '• Target Completion: Saturday by 10:00 AM',
        ],
        footerNote: 'Document capture + personal voice memo',
        accentColor: '#f59e0b',
      },
      isDemo: true,
      isAIGenerated: false,
    },
  },
];

export const INITIAL_MOMENTS: ContinuumMoment[] = SCENARIOS.map((s) => s.moment);

export const DEMO_WHITEBOARD_DATA = {
  title: 'Q3 PRODUCT PLAN',
  items: [
    'Finish prototype',
    'Review pricing',
    'Prepare investor deck',
    'Deadline: Friday',
  ],
  voiceTranscript: 'Q3 product plan. I need to finish this by Friday.',
};
