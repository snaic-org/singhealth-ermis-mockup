/* Seed risk register corpus for ERMIS (cluster-wide, FY2024Q1 to FY2026Q2). */
window.ERMIS = window.ERMIS || {};

window.ERMIS.CORPUS = [
  {
    id: 'RR-24003',
    statement: 'Adverse findings at the JCI triennial re-survey due to inconsistent documentation of patient identification, pain reassessment and care plan updates across inpatient wards resulting in Requirements for Improvement, follow-up evidence submissions and loss of accreditation standing.',
    consequence: 'Requirement to submit an Evidence of Standards Compliance report within 60 days and a possible focused re-survey. Erosion of public and partner confidence in SKH as an accredited academic medical institution.',
    domain: 'Legal & Regulatory',
    impact: 'Moderate',
    likelihood: 'Rare',
    owner: 'Ms Goh Swee Lan, Director, Clinical Governance & Quality',
    institution: 'SKH',
    department: 'Clinical Governance & Quality',
    period: 'FY2024Q1',
    currentControls: [
      'Monthly tracer audits across all inpatient wards by trained JCI tracer teams',
      'Full readiness survey conducted 12 months before re-survey by an external surveyor',
      'Standards-chapter leads appointed with quarterly compliance dashboards to the Medical Board'
    ],
    currentEff: 'Substantial',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: '% of tracer audit elements fully compliant (target: ≥ 95%)', freq: 'Monthly' },
      { text: 'Open Requirements for Improvement from the last survey (target: 0)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Mr Ramesh s/o Krishnan, Manager, Accreditation & Standards'
  },
  {
    id: 'RR-24008',
    statement: 'Laboratory-acquired infection or accidental release of a biological agent from the ocular research laboratories due to lapses in biosafety cabinet use, inadequate decontamination of viral vector waste and insufficiently trained research staff resulting in harm to staff, regulatory action and suspension of laboratory work.',
    consequence: 'Occupational infection of research personnel and possible environmental release requiring notification to MOH. Suspension of gene therapy and viral vector programmes pending investigation, with delays to grant milestones.',
    domain: 'Research',
    impact: 'Moderate',
    likelihood: 'Rare',
    owner: 'Dr Chia Wen Xuan, Head, Research Laboratory Operations',
    institution: 'SNEC',
    department: 'Singapore Eye Research Institute Laboratories',
    period: 'FY2024Q1',
    currentControls: [
      'Annual certification of all biosafety cabinets by an accredited vendor',
      'Institutional Biosafety Committee review and approval of all protocols using biological agents',
      'Mandatory biosafety training and competency sign-off before laboratory access is granted',
      'Autoclave validation with biological indicators every week'
    ],
    currentEff: 'Significant',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Biosafety incidents including spills and exposures (threshold: > 1 per year)', freq: 'Quarterly' },
      { text: '% of laboratory personnel with current biosafety training (target: 100%)', freq: 'Half-yearly' }
    ],
    monitoredBy: 'Ms Teo Pei Shan, Biosafety Officer'
  },
  {
    id: 'RR-24012',
    statement: 'Fraudulent or collusive procurement of goods and services due to undisclosed conflicts of interest, bid rigging among vendors and override of segregation of duties resulting in financial loss, investigation by enforcement agencies and breach of public procurement principles.',
    consequence: 'Direct financial loss and the cost of forensic investigation. Referral to CPIB with potential prosecution, adverse audit findings by MOH Holdings and lasting reputational damage to the institution and cluster.',
    domain: 'Financial',
    impact: 'Major',
    likelihood: 'Unlikely',
    owner: 'Mr Alvin Chua, Director, Procurement',
    institution: 'SGH',
    department: 'Procurement',
    period: 'FY2024Q1',
    currentControls: [
      'GeBIZ tendering with independent evaluation committees and quotation thresholds under the delegation of authority',
      'Annual conflict-of-interest declarations by all procurement staff and evaluation committee members',
      'System-enforced segregation of duties in the ERP across requisition, approval, goods receipt and payment',
      'Continuous data analytics by Group Internal Audit on split purchase orders and vendor master changes'
    ],
    currentEff: 'Nearly complete',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Purchase orders split to circumvent approval limits detected by analytics (threshold: > 0 per quarter)', freq: 'Quarterly' },
      { text: '% of evaluation committee members with completed conflict-of-interest declarations (target: 100%)', freq: 'Annually' }
    ],
    monitoredBy: 'Ms Lee Mei Fong, Senior Manager, Group Internal Audit'
  },
  {
    id: 'RR-24019',
    statement: 'Temperature excursion of vaccines and biologics stored in ward and clinic refrigerators due to power interruptions, refrigerator doors left ajar and gaps in after-hours temperature monitoring resulting in vaccine wastage and potential administration of compromised vaccines to children.',
    consequence: 'Recall and revaccination of affected infants and children, write-off of vaccine stock and loss of parental confidence in childhood immunisation services delivered at KKH.',
    domain: 'Operations',
    impact: 'Minor',
    likelihood: 'Rare',
    owner: 'Ms Sharon Tay, Deputy Director, Pharmacy',
    institution: 'KKH',
    department: 'Pharmacy',
    period: 'FY2024Q1',
    currentControls: [
      'Twice-daily manual temperature logging of all vaccine refrigerators',
      'Pharmacy-grade refrigerators with audible alarms in the main pharmacy store',
      'Cold-chain breach SOP with quarantine of affected stock pending manufacturer advice'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Roll out wireless continuous temperature monitoring with SMS alerts to all 46 ward and clinic vaccine refrigerators',
      'Connect vaccine refrigerators to essential power supply circuits'
    ],
    addChange: 'Significant improvement',
    targetDate: '2026-06-30',
    actionBy: 'Mr Edwin Ng, Senior Pharmacist (Clinical Operations)',
    kris: [
      { text: 'Cold-chain excursions outside 2–8°C lasting more than 30 minutes (threshold: > 2 per quarter)', freq: 'Quarterly' },
      { text: 'Value of vaccines written off due to cold-chain breach (threshold: > S$5,000 per year)', freq: 'Annually' }
    ],
    monitoredBy: 'Ms Lim Shu Fen, Assistant Director, Quality & Patient Safety'
  },
  {
    id: 'RR-24023',
    statement: 'Sharps and splash injuries sustained by dental undergraduate and postgraduate students during clinical attachments due to unfamiliarity with clinic workflows, needle recapping and inconsistent supervision of instrument handling resulting in blood-borne virus exposure and the need for post-exposure management.',
    consequence: 'Anxiety and lost training time for affected students and the cost of post-exposure prophylaxis. Queries from partner universities on the safety of clinical attachments at NDCS.',
    domain: 'Education',
    impact: 'Insignificant',
    likelihood: 'Unlikely',
    owner: 'Dr Kelvin Foo, Director, Education',
    institution: 'NDCS',
    department: 'Education Office',
    period: 'FY2024Q1',
    currentControls: [
      'Orientation briefing on infection control and sharps safety on the first day of attachment',
      'Provision of PPE and chairside sharps containers in all student clinics'
    ],
    currentEff: 'Minor',
    addControls: [
      'Introduce safety-engineered needles and single-handed recapping devices at all student chairs',
      'Implement competency sign-off on instrument handling before the first patient session'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-02-26',
    actionBy: 'Dr Joanne Heng, Consultant, Restorative Dentistry',
    kris: [
      { text: 'Sharps injuries among attached dental students (threshold: > 3 per academic year)', freq: 'Half-yearly' },
      { text: '% of students with instrument-handling competency signed off before first patient session (target: 100%)', freq: 'Half-yearly' }
    ],
    monitoredBy: 'Ms Faridah binte Osman, Senior Nurse Manager, Infection Prevention'
  },
  {
    id: 'RR-24027',
    statement: 'Clinicians performing procedures without current privileges or valid life-support certification due to lapses in tracking of credential renewals and BCLS expiry resulting in practice outside approved scope and non-compliance with credentialing requirements.',
    consequence: 'Patient safety exposure if procedures are performed by clinicians whose competence has not been revalidated, with potential medico-legal liability and adverse findings at licensing inspections.',
    domain: 'Human Capital',
    impact: 'Minor',
    likelihood: 'Unlikely',
    owner: 'Dr Ong Beng Hwee, Deputy Director, Medical Affairs',
    institution: 'SNEC',
    department: 'Medical Affairs',
    period: 'FY2024Q1',
    currentControls: [
      'Credentialing system with automated 90-day expiry alerts to clinicians and heads of department',
      'Operating theatre booking system checks procedural privileges before confirming cases',
      'Quarterly audit of privileges against procedures performed'
    ],
    currentEff: 'Significant',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: '% of medical staff with current procedural privileges (target: 100%)', freq: 'Quarterly' },
      { text: 'Procedures performed by clinicians with lapsed BCLS or privileges (target: 0)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Cheryl Wee, Manager, Medical Affairs'
  },
  {
    id: 'RR-24031',
    statement: 'Premature destruction or over-retention of medical records due to inconsistent application of the records retention schedule across paper and electronic records resulting in non-compliance with MOH record-keeping requirements and the PDPA retention limitation obligation.',
    consequence: 'Inability to produce records for medico-legal cases or continuity of care, and regulatory exposure for holding personal data longer than necessary.',
    domain: 'Legal & Regulatory',
    impact: 'Minor',
    likelihood: 'Rare',
    owner: 'Mr Benjamin Toh, Head, Health Information Management',
    institution: 'SCH',
    department: 'Health Information Management',
    period: 'FY2024Q2',
    currentControls: [
      'Approved records retention schedule aligned to MOH guidelines',
      'Two-level approval for disposal batches with certificates of destruction from a licensed vendor',
      'Annual review of records disposal by Group Internal Audit'
    ],
    currentEff: 'Significant',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Disposal batches without completed certificates of destruction (target: 0)', freq: 'Half-yearly' },
      { text: '% of records held beyond retention period pending disposal (threshold: > 5%)', freq: 'Annually' }
    ],
    monitoredBy: 'Ms Rosnah binte Ali, Data Protection Officer'
  },
  {
    id: 'RR-24036',
    statement: 'Compromised integrity of clinical trial data due to manual transcription from the EMR to case report forms, uncontrolled spreadsheets and inadequate audit trails resulting in unreliable study results, adverse sponsor audit findings and inability to support regulatory submissions.',
    consequence: 'Rejection of trial data by sponsors or HSA, potential retraction of publications and suspension of investigator-initiated trials, damaging the standing of NCCS as a leading oncology research centre.',
    domain: 'Research',
    impact: 'Major',
    likelihood: 'Rare',
    owner: 'A/Prof Lim Hong Wei, Director, Clinical Trials & Epidemiological Sciences',
    institution: 'NCCS',
    department: 'Division of Clinical Trials & Epidemiological Sciences',
    period: 'FY2024Q2',
    currentControls: [
      'Mandatory ICH-GCP training for all study team members every three years',
      'Source data verification by trial monitors for sponsored trials',
      'Validated electronic data capture system for investigator-initiated trials'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Implement eSource-to-EDC integration for laboratory results and vital signs in oncology trials',
      'Decommission uncontrolled spreadsheets with quarterly data management audits'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-07-31',
    actionBy: 'Ms Clara Yeo, Manager, Clinical Research Coordination',
    kris: [
      { text: 'Source data verification discrepancy rate (threshold: > 2% of data points)', freq: 'Quarterly' },
      { text: 'Major data integrity findings from sponsor or HSA audits (target: 0)', freq: 'Annually' }
    ],
    monitoredBy: 'Dr Siti Hajar binte Ismail, Head, Research Quality Assurance'
  },
  {
    id: 'RR-24040',
    statement: 'Post-injection endophthalmitis following intravitreal anti-VEGF injections due to breaches in aseptic technique, inadequate povidone-iodine contact time and contamination of shared items in high-volume injection sessions resulting in permanent visual loss for affected patients.',
    consequence: 'Severe and potentially irreversible loss of vision requiring urgent vitrectomy, medico-legal claims and a review of the high-volume injection service model.',
    domain: 'Clinical',
    impact: 'Major',
    likelihood: 'Rare',
    owner: 'Adj Asst Prof Ng Li Lian, Head, Medical Retina Service',
    institution: 'SNEC',
    department: 'Medical Retina',
    period: 'FY2024Q2',
    currentControls: [
      'Dedicated clean injection rooms with a standardised aseptic protocol',
      'Povidone-iodine 5% with timed contact before injection and a no-talk, masked-operator policy',
      'Single-use speculum and injection packs for every patient',
      'Endophthalmitis surveillance registry reviewed monthly by the Infection Control Committee'
    ],
    currentEff: 'Significant',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Endophthalmitis rate per 10,000 intravitreal injections (threshold: > 3)', freq: 'Quarterly' },
      { text: 'Aseptic technique audit compliance (target: ≥ 98%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Tan Ai Ling, Nurse Clinician, Ophthalmic Infection Control'
  },
  {
    id: 'RR-24044',
    statement: 'Mismanagement of competitive research grant funds due to charging of ineligible expenditure, late virements and weak reconciliation between grant ledgers and the finance system resulting in clawback of funds and adverse findings by the funding agency.',
    consequence: 'Clawback of funds by NMRC or other funders, suspension of future grant eligibility for principal investigators and qualified audit opinions on grant statements.',
    domain: 'Financial',
    impact: 'Moderate',
    likelihood: 'Rare',
    owner: 'Ms Joyce Lau, Assistant Director, Finance (Research Grants)',
    institution: 'NHCS',
    department: 'Finance – Research Grants',
    period: 'FY2024Q2',
    currentControls: [
      'Pre-award budget review of all grant applications by the Grants Office',
      'Monthly grant expenditure statements issued to principal investigators',
      'Annual external audit of grant statements of account'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Configure automated eligibility rules in the finance system for grant cost centres',
      'Introduce quarterly reconciliation reviews between the Research Office and Finance with PI sign-off'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2026-11-30',
    actionBy: 'Mr Jason Wong, Senior Manager, Research Finance',
    kris: [
      { text: 'Ineligible expenditure identified in grant audits (threshold: > S$10,000 per year)', freq: 'Annually' },
      { text: 'Grant accounts with unreconciled balances older than 60 days (threshold: > 3)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Dr Lee Pei Yi, Director, Research Office'
  },
  {
    id: 'RR-24049',
    statement: 'Delays in non-emergency patient transport for inter-facility transfers and specialist appointments due to limited contracted ambulance slots and late transport bookings resulting in missed appointments, prolonged length of stay and patient dissatisfaction.',
    consequence: 'Rehabilitation patients miss specialist reviews at acute hospitals, extending their community hospital stay and reducing bed availability for new step-down admissions.',
    domain: 'Operations',
    impact: 'Minor',
    likelihood: 'Unlikely',
    owner: 'Ms Angeline Chew, Deputy Director, Operations',
    institution: 'SCH',
    department: 'Operations',
    period: 'FY2024Q2',
    currentControls: [
      'Term contracts with two non-emergency ambulance service providers',
      'Transport booking cut-off 48 hours before scheduled appointments',
      'Daily review of the transport schedule by the patient services team'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Introduce a real-time transport booking dashboard shared with SGH and SKH specialist clinics',
      'Establish standby vendor arrangements for peak-period transfers'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-12-15',
    actionBy: 'Mr Haris bin Abdullah, Executive, Patient Services',
    kris: [
      { text: '% of scheduled transfers departing within 30 minutes of booked time (target: ≥ 90%)', freq: 'Monthly' },
      { text: 'Specialist appointments missed due to transport delays (threshold: > 5 per month)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Valerie Sim, Manager, Service Quality'
  },
  {
    id: 'RR-24053',
    statement: 'Inadequate supervision of junior doctors during night and weekend calls due to high patient census, competing demands on on-call registrars and reluctance of trainees to escalate resulting in delayed clinical decisions and patient harm.',
    consequence: 'Delayed treatment of deteriorating patients managed by unsupervised trainees, with serious incidents attributable to supervision gaps and adverse feedback in ACGME-I resident surveys.',
    domain: 'Education',
    impact: 'Moderate',
    likelihood: 'Unlikely',
    owner: 'Dr Melvin Goh, Designated Institutional Official, Graduate Medical Education',
    institution: 'CGH',
    department: 'Graduate Medical Education Office',
    period: 'FY2024Q2',
    currentControls: [
      'Tiered on-call roster with consultant presence on site until 10 pm daily',
      'Mandatory escalation criteria card issued to all house officers and residents',
      'Night float system with a senior resident overseeing each medical block',
      'Monthly trainee feedback sessions with programme directors'
    ],
    currentEff: 'Nearly complete',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Trainee survey score on adequacy of night supervision (target: ≥ 4.0 out of 5)', freq: 'Annually' },
      { text: 'Incidents attributed to inadequate supervision of trainees (threshold: > 1 per quarter)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Lynette Poh, Manager, Graduate Medical Education'
  },
  {
    id: 'RR-24058',
    statement: 'Transmission of infection to patients from contaminated dental unit waterlines or inadequately reprocessed handpieces due to biofilm formation, missed shock-treatment cycles and capacity constraints in central sterilisation resulting in patient infection and a public health investigation.',
    consequence: 'Infections such as Legionella or non-tuberculous mycobacteria among dental patients, suspension of affected clinics and the need for patient look-back notification.',
    domain: 'Hazard',
    impact: 'Major',
    likelihood: 'Rare',
    owner: 'Dr Shirley Kwek, Chair, Infection Control Committee',
    institution: 'NDCS',
    department: 'Infection Prevention & Control',
    period: 'FY2024Q3',
    currentControls: [
      'Daily waterline flushing and weekly shock treatment of all dental units',
      'All handpieces autoclaved between patients with instrument tracking',
      'Quarterly microbiological testing of waterline samples'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Install continuous in-line waterline disinfection units on all 120 dental chairs',
      'Increase central sterile supply capacity with an additional washer-disinfector'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-11-14',
    actionBy: 'Mr Tay Boon Keng, Manager, Facilities & Central Sterile Services',
    kris: [
      { text: '% of dental unit waterline samples at or below 500 CFU/mL (target: 100%)', freq: 'Quarterly' },
      { text: 'Handpiece reprocessing tracking compliance (target: ≥ 99%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Noraini binte Hassan, Infection Control Nurse'
  },
  {
    id: 'RR-24062',
    statement: 'Negative patient feedback on clinic waiting times and pharmacy queues due to high attendances on peak clinic days and waiting for pupil dilation resulting in minor complaints and unfavourable online reviews.',
    consequence: 'Slight reduction in patient satisfaction scores and additional workload for patient relations staff handling complaints.',
    domain: 'Reputation',
    impact: 'Insignificant',
    likelihood: 'Unlikely',
    owner: 'Ms Janice Leong, Head, Patient Experience',
    institution: 'SNEC',
    department: 'Patient Experience',
    period: 'FY2024Q3',
    currentControls: [
      'Queue display boards and SMS notification when patients are due to be seen',
      'Quarterly patient experience survey with results shared with clinic heads',
      'Service recovery protocol for patients waiting more than 90 minutes'
    ],
    currentEff: 'Substantial',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Ratio of compliments to waiting-time complaints (target: ≥ 3:1)', freq: 'Quarterly' },
      { text: 'Median clinic waiting time from registration to consultation (threshold: > 60 min)', freq: 'Monthly' }
    ],
    monitoredBy: 'Mr Yeo Chee Keong, Manager, Clinic Operations'
  },
  {
    id: 'RR-24067',
    statement: 'Non-compliance with licensing conditions for assisted reproduction services due to lapses in embryo and gamete chain-of-custody documentation and witnessing procedures resulting in adverse MOH audit findings and potential suspension of the service licence.',
    consequence: 'Suspension of IVF services affecting couples mid-treatment, potential embryo mix-up with grave legal and ethical consequences, and national media attention.',
    domain: 'Legal & Regulatory',
    impact: 'Major',
    likelihood: 'Rare',
    owner: 'A/Prof Wong Mei Ling, Head, KK IVF Centre',
    institution: 'KKH',
    department: 'KK IVF Centre',
    period: 'FY2024Q3',
    currentControls: [
      'Electronic RFID witnessing system for all gamete and embryo handling steps',
      'Manual double witnessing at critical steps as a secondary check',
      'Quarterly internal audit against MOH licensing conditions',
      'Annual external quality assessment of embryology laboratory'
    ],
    currentEff: 'Nearly complete',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Witnessing non-conformances detected (target: 0)', freq: 'Monthly' },
      { text: 'Major findings from MOH licensing audits (target: 0)', freq: 'Annually' }
    ],
    monitoredBy: 'Ms Chong Siew Lin, Manager, Quality & Regulatory Compliance'
  },
  {
    id: 'RR-24071',
    statement: 'Loss of irreplaceable specimens in the neuroscience tissue biobank due to ultra-low temperature freezer failure, delayed alarm response after office hours and power disruption resulting in loss of research assets and inability to complete funded studies.',
    consequence: 'Loss of longitudinal neurodegenerative disease cohorts collected over a decade, with breach of obligations to funders and participants who donated samples.',
    domain: 'Research',
    impact: 'Moderate',
    likelihood: 'Rare',
    owner: 'Dr Yap Kai Ling, Director, Neuroscience Research Laboratory',
    institution: 'NNI',
    department: 'Research Laboratory',
    period: 'FY2024Q3',
    currentControls: [
      'Ultra-low temperature freezers connected to the building alarm with an on-call roster',
      'Spare freezer capacity reserved for emergency transfer of samples',
      'Quarterly preventive maintenance of freezers by the vendor'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Install cloud-based remote temperature monitoring with escalating phone alerts',
      'Split high-value cohorts across two physical storage sites'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-12-31',
    actionBy: 'Mr Isaac Lim, Laboratory Manager',
    kris: [
      { text: 'After-hours freezer alarm response time (target: ≤ 30 min)', freq: 'Monthly' },
      { text: 'Specimens lost due to storage failure (target: 0)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Rachel Tan, Manager, Research Governance'
  },
  {
    id: 'RR-24075',
    statement: 'Accumulation of uncollectable debts from non-resident patients due to inadequate deposit collection at admission and limited recourse after discharge resulting in write-offs and pressure on operating budgets.',
    consequence: 'Growing bad debt from non-resident maternity and neonatal intensive care admissions, requiring provisions that reduce funds available for patient care initiatives.',
    domain: 'Financial',
    impact: 'Minor',
    likelihood: 'Unlikely',
    owner: 'Mr Sean Lim, Assistant Director, Finance (Patient Accounts)',
    institution: 'KKH',
    department: 'Finance – Patient Accounts',
    period: 'FY2024Q3',
    currentControls: [
      'Deposit policy for non-resident patients at admission',
      'Financial counselling for patients with large estimated bills',
      'Referral of overdue accounts to a debt collection agency after 120 days'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Mandate pre-admission financial counselling and deposit top-up triggers for non-resident maternity and NICU admissions',
      'Implement automated debt ageing alerts to the Business Office'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-08-31',
    actionBy: 'Ms Priya d/o Subramaniam, Manager, Business Office',
    kris: [
      { text: 'Non-resident debts aged more than 180 days (threshold: > S$400,000)', freq: 'Monthly' },
      { text: 'Bad debt write-off as % of patient revenue (threshold: > 0.5%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Karen Tham, Senior Manager, Finance Controls'
  },
  {
    id: 'RR-24080',
    statement: 'Unintended retention of a surgical swab, instrument or needle in a patient due to incomplete surgical counts during emergency or prolonged procedures and staff changeover mid-case resulting in re-operation, serious patient harm and a serious reportable event.',
    consequence: 'Additional surgery, infection or organ injury for the patient, mandatory reporting to MOH, medico-legal claims and loss of public confidence in surgical safety.',
    domain: 'Clinical',
    impact: 'Extreme',
    likelihood: 'Rare',
    owner: 'Dr Chan Wei Ming, Director, Major Operating Theatres',
    institution: 'CGH',
    department: 'Major Operating Theatres',
    period: 'FY2024Q3',
    currentControls: [
      'WHO Surgical Safety Checklist with a standardised surgical count policy',
      'Use of radio-opaque swabs and sponges in all procedures',
      'Mandatory intra-operative X-ray when a count discrepancy cannot be resolved'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Pilot RFID-tagged surgical sponge detection for open abdominal and pelvic procedures',
      'Mandate structured count handover with whiteboard verification at every staff relief'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2026-12-20',
    actionBy: 'Ms Lee Hui Ling, Nurse Clinician, Operating Theatre',
    kris: [
      { text: 'Retained surgical items (target: 0)', freq: 'Monthly' },
      { text: 'Surgical count discrepancy incidents per 1,000 procedures (threshold: > 1.0)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Dr Farhan bin Yusof, Director, Patient Safety'
  },
  {
    id: 'RR-24084',
    statement: 'Citations or adverse accreditation decisions for the neurology and neurosurgery residency programmes due to gaps in milestone assessments, scholarly activity and faculty development documentation resulting in reduced accreditation status and lower attractiveness to applicants.',
    consequence: 'Programme placed on warning by ACGME-I, reduced residency intake and difficulty building the future neuroscience workforce pipeline.',
    domain: 'Education',
    impact: 'Minor',
    likelihood: 'Rare',
    owner: 'A/Prof Lee Kwang Siang, Programme Director, Neurology Residency',
    institution: 'NNI',
    department: 'Neurology Residency Programme',
    period: 'FY2024Q4',
    currentControls: [
      'Annual programme evaluation committee review with action plans',
      'Clinical competency committee review of milestones twice a year',
      'Monitoring of ACGME-I resident and faculty survey results'
    ],
    currentEff: 'Substantial',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'ACGME-I citations received (target: 0)', freq: 'Annually' },
      { text: '% of residents with milestone evaluations completed on time (target: 100%)', freq: 'Half-yearly' }
    ],
    monitoredBy: 'Ms Melissa Ang, Programme Coordinator, Graduate Medical Education'
  },
  {
    id: 'RR-24088',
    statement: 'Cytotoxic drug spills during compounding, transport or administration due to equipment failure, damaged packaging and improper handling of closed-system transfer devices resulting in occupational exposure of staff and contamination of clinical areas.',
    consequence: 'Acute skin and mucosal exposure and potential long-term reproductive and carcinogenic effects for staff, with temporary closure of affected treatment areas for decontamination.',
    domain: 'Hazard',
    impact: 'Moderate',
    likelihood: 'Unlikely',
    owner: 'Ms Grace Ho, Deputy Director, Nursing (Ambulatory Treatment)',
    institution: 'NCCS',
    department: 'Ambulatory Treatment Unit',
    period: 'FY2024Q4',
    currentControls: [
      'Closed-system transfer devices for all cytotoxic preparation and administration',
      'Cytotoxic spill kits available in all compounding, transport and treatment areas',
      'Annual spill management training and drills',
      'Sealed, labelled transport containers for cytotoxic deliveries'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Implement six-monthly surface wipe sampling for cytotoxic residue',
      'Enforce a dedicated sealed courier route for cytotoxic deliveries in place of the pneumatic tube system'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-09-30',
    actionBy: 'Mr Victor Lam, Workplace Safety & Health Officer',
    kris: [
      { text: 'Cytotoxic spill incidents (threshold: > 2 per quarter)', freq: 'Quarterly' },
      { text: '% of oncology nurses with current cytotoxic handling competency (target: 100%)', freq: 'Annually' }
    ],
    monitoredBy: 'Ms Elaine Kwok, Assistant Director, Occupational Health & Safety'
  },
  {
    id: 'RR-24092',
    statement: 'Prolonged breakdown of bed lifts in the ward block due to ageing lift components and delayed replacement of parts resulting in disrupted patient transfers to rehabilitation gyms and delays in admissions.',
    consequence: 'Missed therapy sessions and slower admissions from acute hospitals during lift outages, with minor inconvenience to patients and staff.',
    domain: 'Operations',
    impact: 'Minor',
    likelihood: 'Rare',
    owner: 'Mr Ang Kok Leong, Head, Facilities Management',
    institution: 'SCH',
    department: 'Facilities Management',
    period: 'FY2024Q4',
    currentControls: [
      'Monthly preventive maintenance under a term contract with a 2-hour emergency response',
      'Two bed lifts serving each ward block',
      'Lift modernisation programme completed for all bed lifts',
      'Contingency plan using alternative lifts and adjusted therapy schedules'
    ],
    currentEff: 'Significant',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Bed lift unplanned downtime (threshold: > 8 hours per month)', freq: 'Monthly' },
      { text: 'Lift entrapment incidents (target: 0)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Deborah Wong, Manager, Operations'
  },
  {
    id: 'RR-24095',
    statement: 'Operating expenditure exceeding the approved budget due to higher-than-planned consumption of neuro-interventional consumables and supplier price escalation resulting in budget variances that require reallocation and deferral of planned initiatives.',
    consequence: 'Deferral of approved service development initiatives and additional scrutiny from cluster finance at mid-year budget review.',
    domain: 'Financial',
    impact: 'Minor',
    likelihood: 'Possible',
    owner: 'Ms Cindy Koh, Assistant Director, Finance',
    institution: 'NNI',
    department: 'Finance',
    period: 'FY2024Q4',
    currentControls: [
      'Monthly budget variance reports to department heads',
      'Approval required for unbudgeted expenditure above S$50,000',
      'Mid-year budget review with reforecasting'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Implement a consumables utilisation dashboard by procedure type and clinician',
      'Negotiate price-hold clauses in renewals of neuro-interventional consumables contracts'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2027-01-08',
    actionBy: 'Mr Desmond Phua, Senior Manager, Finance Business Partnering',
    kris: [
      { text: 'Year-to-date operating expenditure variance against budget (threshold: > 3%)', freq: 'Monthly' },
      { text: 'Unbudgeted expenditure approvals above S$50,000 (threshold: > 4 per quarter)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Dr Leong Wai Kit, Deputy Director, Clinical Services'
  },
  {
    id: 'RR-24097',
    statement: 'Impersonation of oncologists in fraudulent online advertisements promoting unproven cancer remedies due to deepfake technology and slow platform takedown responsiveness resulting in public confusion and erosion of trust in clinical advice from NCCS.',
    consequence: 'Patients may delay evidence-based treatment or suffer financial loss, and NCCS may be wrongly associated with fraudulent products.',
    domain: 'Reputation',
    impact: 'Minor',
    likelihood: 'Unlikely',
    owner: 'Ms Audrey Chan, Head, Corporate Communications',
    institution: 'NCCS',
    department: 'Corporate Communications',
    period: 'FY2024Q4',
    currentControls: [
      'Social media monitoring tool scanning daily for misuse of NCCS branding and clinician names',
      'Established takedown escalation channels with major social media platforms',
      'Public advisories on official channels on how to identify genuine NCCS communications'
    ],
    currentEff: 'Substantial',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Time to takedown of reported impersonation content (target: ≤ 72 hours)', freq: 'Ad hoc' },
      { text: 'Impersonation advertisements detected (threshold: > 5 per quarter)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Mr Bryan Ho, Senior Executive, Digital Communications'
  },
  {
    id: 'RR-24099',
    statement: 'Use of unapproved cloud storage, messaging and generative AI applications to share patient images and clinical data due to convenience and the lack of approved alternatives resulting in uncontrolled data exposure and non-compliance with cluster IT security policies.',
    consequence: 'Patient fundus photographs and clinical notes residing on consumer platforms outside cluster control, with exposure to data breach and PDPA enforcement.',
    domain: 'Information Technology',
    impact: 'Minor',
    likelihood: 'Possible',
    owner: 'Mr Terence Low, Head, Clinical Informatics',
    institution: 'SNEC',
    department: 'Clinical Informatics',
    period: 'FY2024Q4',
    currentControls: [
      'Web filtering blocks known consumer file-sharing sites on the corporate network',
      'Annual attestation to the IT acceptable use policy',
      'Approved secure messaging application available to clinicians'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Deploy an approved secure ophthalmic image-sharing workspace integrated with the EMR',
      'Enable cloud access security broker monitoring for unsanctioned applications'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2026-09-15',
    actionBy: 'Ms Jasmine Lim, Manager, IT Security Operations',
    kris: [
      { text: 'Uploads to unsanctioned cloud applications detected (threshold: > 10 per month)', freq: 'Monthly' },
      { text: '% of staff completing the annual IT security awareness module (target: ≥ 98%)', freq: 'Annually' }
    ],
    monitoredBy: 'Mr Chew Kian Seng, Information Security Officer'
  },
  {
    id: 'RR-25004',
    statement: 'Wrong-site, wrong-side or wrong-patient surgery due to incomplete site marking, failure of time-out verification and discrepancies between the consent form and theatre list resulting in irreversible patient harm and a serious reportable event.',
    consequence: 'Permanent injury or loss of function for the patient, mandatory reporting to MOH, medico-legal claims and significant reputational damage to SGH.',
    domain: 'Clinical',
    impact: 'Extreme',
    likelihood: 'Rare',
    owner: 'A/Prof Ho Kah Wai, Director, Perioperative Services',
    institution: 'SGH',
    department: 'Perioperative Services',
    period: 'FY2025Q1',
    currentControls: [
      'Universal Protocol with mandatory surgeon site marking before transfer to theatre',
      'WHO Surgical Safety Checklist with electronic time-out documentation in the EMR',
      'Reconciliation of consent forms against the theatre list on the day before surgery',
      'Quarterly observational audits of time-out quality'
    ],
    currentEff: 'Nearly complete',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Wrong-site, wrong-side or wrong-patient surgery events (target: 0)', freq: 'Monthly' },
      { text: 'Observed time-out compliance with all elements (target: ≥ 98%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Ng Siew Hoon, Senior Nurse Manager, Operating Theatres'
  },
  {
    id: 'RR-25009',
    statement: 'Breach of PDPA obligations by third-party vendors processing patient data due to inadequate data protection clauses in contracts, limited oversight of sub-contractors and absence of periodic vendor assessments resulting in personal data breaches attributable to NHCS and regulatory enforcement.',
    consequence: 'Financial penalties by the PDPC, mandatory breach notification to affected patients and loss of trust in how NHCS safeguards personal data entrusted to it.',
    domain: 'Legal & Regulatory',
    impact: 'Moderate',
    likelihood: 'Unlikely',
    owner: 'Ms Teresa Yong, Data Protection Officer',
    institution: 'NHCS',
    department: 'Legal & Data Protection',
    period: 'FY2025Q1',
    currentControls: [
      'Standard data protection clauses included in all new contracts',
      'Vendor security questionnaire completed at onboarding'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Conduct risk-tiered annual data protection assessments of 40 critical vendors',
      'Retrofit data protection and breach notification clauses into legacy contracts at renewal'
    ],
    addChange: 'Significant improvement',
    targetDate: '2026-11-30',
    actionBy: 'Mr Lionel Tan, Senior Manager, Legal Services',
    kris: [
      { text: '% of critical vendors with a completed annual data protection assessment (target: 100%)', freq: 'Annually' },
      { text: 'Vendor-related data incidents (threshold: > 1 per half-year)', freq: 'Half-yearly' }
    ],
    monitoredBy: 'Ms Ivy Chua, Manager, Procurement'
  },
  {
    id: 'RR-25013',
    statement: 'Enrolment of children in research without valid parental consent or age-appropriate assent due to use of superseded consent form versions and inadequate study team training on Human Biomedical Research Act requirements resulting in research non-compliance findings and loss of participant trust.',
    consequence: 'Exclusion of affected participants’ data, suspension of studies by the Institutional Review Board and potential regulatory action under the Human Biomedical Research Act.',
    domain: 'Research',
    impact: 'Major',
    likelihood: 'Rare',
    owner: 'Prof Cheng Li Hua, Director, Research',
    institution: 'KKH',
    department: 'Research Office',
    period: 'FY2025Q1',
    currentControls: [
      'IRB-approved paediatric consent and assent templates',
      'Mandatory Human Biomedical Research Act training for study teams',
      'Annual consent audit on a sample of active studies'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Implement electronic consent with version control and an assent checklist for paediatric studies',
      'Introduce 100% consent verification for the first five participants of each new study'
    ],
    addChange: 'Significant improvement',
    targetDate: '2026-06-30',
    actionBy: 'Ms Amanda Koh, Manager, Clinical Research Governance',
    kris: [
      { text: 'Consent deficiencies found in audit per 100 consent forms (threshold: > 2)', freq: 'Quarterly' },
      { text: 'Studies using superseded consent form versions (target: 0)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Dr Harith bin Mohamed, Chair, Research Quality Committee'
  },
  {
    id: 'RR-25018',
    statement: 'Non-completion of mandatory nursing competency and continuing professional development modules due to clinical workload and competing training schedules resulting in minor gaps in training records and late practising certificate renewals.',
    consequence: 'Administrative follow-up for affected nurses and a small number of nurses temporarily redeployed until competencies are completed.',
    domain: 'Education',
    impact: 'Insignificant',
    likelihood: 'Possible',
    owner: 'Ms Ruth Lee, Assistant Director, Nursing Education',
    institution: 'KKH',
    department: 'Nursing Education',
    period: 'FY2025Q1',
    currentControls: [
      'Learning management system tracking with automated reminders to nurses and nurse managers',
      'Protected learning time scheduled in nursing rosters'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Introduce micro-learning modules accessible on mobile devices during shifts'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-10-31',
    actionBy: 'Ms Hasnah binte Jaafar, Nurse Educator',
    kris: [
      { text: '% of nurses completing mandatory annual competencies by 31 March (target: ≥ 95%)', freq: 'Annually' },
      { text: 'Nurses with insufficient continuing education points three months before renewal (threshold: > 2%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Linda Soh, Deputy Director, Nursing'
  },
  {
    id: 'RR-25022',
    statement: 'Heat-related illness among staff and patients at outdoor queue, vaccination and screening areas of polyclinics due to high ambient temperatures and prolonged exposure during peak periods resulting in heat exhaustion and disruption of services.',
    consequence: 'Staff or elderly patients requiring first aid or emergency conveyance, with temporary suspension of outdoor services on extreme heat days.',
    domain: 'Hazard',
    impact: 'Minor',
    likelihood: 'Possible',
    owner: 'Mr Roy Tan, Head, Workplace Safety & Health',
    institution: 'SHP',
    department: 'Workplace Safety & Health',
    period: 'FY2025Q1',
    currentControls: [
      'Wet bulb globe temperature monitoring with heat stress advisories to polyclinic managers',
      'Shaded, fan-cooled waiting areas for outdoor queues',
      'Hydration points and rest-shade-hydrate schedules for outdoor staff',
      'Staggered appointment slots during mass vaccination and screening exercises'
    ],
    currentEff: 'Significant',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Heat-related illness cases among staff and patients (target: 0)', freq: 'Monthly' },
      { text: '% of days with WBGT ≥ 33°C on which outdoor work-rest cycles were applied (target: 100%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Jacqueline Ong, Senior Manager, Polyclinic Operations'
  },
  {
    id: 'RR-25026',
    statement: 'Delayed, lost or compromised laboratory specimens transported from polyclinics to the central laboratory due to courier delays, temperature excursions and labelling errors resulting in repeat venepuncture, delayed results and patient inconvenience.',
    consequence: 'Patients recalled for repeat blood tests, delayed adjustment of chronic disease medications and additional cost of repeat testing.',
    domain: 'Operations',
    impact: 'Minor',
    likelihood: 'Likely',
    owner: 'Ms Joanna Teo, Deputy Director, Clinical Support Services',
    institution: 'SHP',
    department: 'Clinical Support Services',
    period: 'FY2025Q1',
    currentControls: [
      'Barcode labelling at the point of collection',
      'Temperature-controlled transport boxes for all specimen runs',
      'Specimen manifest reconciliation on receipt at the central laboratory'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Implement end-to-end specimen tracking with GPS-enabled courier handover',
      'Introduce specimen rejection analytics with feedback to polyclinic phlebotomy teams'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-07-15',
    actionBy: 'Mr Faizal bin Rahim, Manager, Laboratory Logistics',
    kris: [
      { text: 'Specimen rejection rate due to transport or labelling issues (threshold: > 0.5%)', freq: 'Monthly' },
      { text: 'Specimens lost in transit (target: 0)', freq: 'Monthly' }
    ],
    monitoredBy: 'Dr Ong Siew Kim, Head, Quality Management'
  },
  {
    id: 'RR-25031',
    statement: 'Residents exceeding duty hour limits due to understaffed call rosters, unplanned leave cover and handover delays resulting in fatigue-related errors and ACGME-I compliance citations.',
    consequence: 'Fatigue-related clinical errors, resident burnout and potential citations affecting the accreditation status of SGH-based residency programmes.',
    domain: 'Education',
    impact: 'Minor',
    likelihood: 'Possible',
    owner: 'A/Prof Kwan Yu Heng, Designated Institutional Official, Graduate Medical Education',
    institution: 'SGH',
    department: 'Graduate Medical Education',
    period: 'FY2025Q2',
    currentControls: [
      'Electronic rostering with hard stops at duty hour limits',
      'Monthly duty hour monitoring by programme coordinators',
      'Night float system and protected post-call time'
    ],
    currentEff: 'Nearly complete',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: '% of residents with a duty hour violation in the month (threshold: > 2%)', freq: 'Monthly' },
      { text: 'Average weekly duty hours over four weeks (threshold: > 80 hours)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Clarice Ng, Manager, Graduate Medical Education'
  },
  {
    id: 'RR-25035',
    statement: 'Unfavourable online reviews and social media comments about polyclinic waiting times and staff attitude due to peak-hour congestion and inconsistent service recovery resulting in minor negative public perception of polyclinic services.',
    consequence: 'Lower online ratings for individual polyclinics and a modest increase in written complaints to SHP headquarters.',
    domain: 'Reputation',
    impact: 'Insignificant',
    likelihood: 'Likely',
    owner: 'Ms Winnie Lau, Head, Service Quality & Patient Experience',
    institution: 'SHP',
    department: 'Service Quality',
    period: 'FY2025Q2',
    currentControls: [
      'Monthly review of online reviews by polyclinic managers',
      'Service recovery training for frontline staff'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Deploy centralised online feedback monitoring with a three-working-day response standard'
    ],
    addChange: 'Minor improvement',
    targetDate: '2026-11-20',
    actionBy: 'Mr Kenneth Sim, Executive, Patient Relations',
    kris: [
      { text: 'Average online review rating across polyclinics (target: ≥ 3.8 out of 5)', freq: 'Quarterly' },
      { text: '% of online feedback responded to within three working days (target: ≥ 90%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Jacqueline Ong, Senior Manager, Polyclinic Operations'
  },
  {
    id: 'RR-25039',
    statement: 'Shortage of qualified radiation therapists and medical physicists due to a small local training pipeline and competition from private cancer centres resulting in reduced linear accelerator operating hours and longer waiting times for radiotherapy.',
    consequence: 'Delays to the start of curative radiotherapy beyond clinically recommended intervals and reduced capacity to absorb growth in cancer cases.',
    domain: 'Human Capital',
    impact: 'Moderate',
    likelihood: 'Likely',
    owner: 'Dr Chua Kai Lin, Head, Division of Radiation Oncology',
    institution: 'NCCS',
    department: 'Division of Radiation Oncology',
    period: 'FY2025Q2',
    currentControls: [
      'Sponsorship scholarships for radiation therapy and medical physics students',
      'Extended linac shifts with shift allowances',
      'Retention bonuses for radiation therapists at key career milestones',
      'Overseas recruitment from Australia, the United Kingdom and the Philippines'
    ],
    currentEff: 'Significant',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Radiation therapist vacancy rate (threshold: > 8%)', freq: 'Quarterly' },
      { text: 'Median wait from simulation to first radiotherapy fraction (threshold: > 14 days)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Pamela Yeo, Senior Manager, Human Resource'
  },
  {
    id: 'RR-25043',
    statement: 'Inadequate clinical assessment during video consultations for oncology follow-up due to poor connectivity, unsuitable patient selection and inability to perform physical examination resulting in missed signs of disease progression and repeat physical visits.',
    consequence: 'Late detection of recurrence or treatment toxicity in a small number of patients and duplicated appointments that offset telehealth efficiency gains.',
    domain: 'Technology',
    impact: 'Minor',
    likelihood: 'Possible',
    owner: 'Dr Tan Jun Hao, Clinical Lead, Telehealth',
    institution: 'NCCS',
    department: 'Telehealth Office',
    period: 'FY2025Q2',
    currentControls: [
      'Documented patient selection criteria for video consultations',
      'Compliance with MOH telemedicine licensing conditions under the Healthcare Services Act',
      'Approved video consultation platform integrated with appointment scheduling'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Introduce a pre-consultation symptom questionnaire with automatic conversion to a physical visit for red-flag responses',
      'Provide connectivity tests and tablet loans for elderly patients'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-12-10',
    actionBy: 'Ms Michelle Goh, Nurse Clinician, Ambulatory Oncology',
    kris: [
      { text: 'Video consultations converted to physical visits due to technical failure (threshold: > 5%)', freq: 'Monthly' },
      { text: 'Unplanned admissions within 14 days of a video consultation (threshold: > 2%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Mr Alan Chia, Manager, Clinical Informatics'
  },
  {
    id: 'RR-25047',
    statement: 'Revenue leakage from unbilled dental laboratory items, prostheses and implant components due to manual charge capture and mismatches between treatment notes and billing codes resulting in loss of revenue and inaccurate subsidy claims.',
    consequence: 'Recurring under-recovery of costs for prosthodontic and implant treatment and potential restatement of subsidy claims to MOH.',
    domain: 'Financial',
    impact: 'Minor',
    likelihood: 'Unlikely',
    owner: 'Mr Gabriel Lee, Head, Finance',
    institution: 'NDCS',
    department: 'Finance',
    period: 'FY2025Q2',
    currentControls: [
      'Manual charge sheets completed by dental surgery assistants after each procedure',
      'Monthly sample-based reconciliation of laboratory work orders to bills'
    ],
    currentEff: 'Minor',
    addControls: [
      'Implement automated charge capture linking dental charting procedure codes to billing',
      'Conduct quarterly charge reconciliation between dental laboratory work orders and patient bills'
    ],
    addChange: 'Significant improvement',
    targetDate: '2026-08-15',
    actionBy: 'Ms Ho Li Ping, Manager, Revenue Cycle',
    kris: [
      { text: 'Unbilled laboratory and prosthesis items detected in reconciliation (threshold: > 1% of items)', freq: 'Quarterly' },
      { text: 'Estimated revenue leakage (threshold: > S$20,000 per quarter)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Mr Wilson Tan, Senior Auditor, Group Internal Audit'
  },
  {
    id: 'RR-25052',
    statement: 'Invalid consent for neurosurgical and neuro-interventional procedures due to inadequate documentation of mental capacity assessments and reliance on family members without a Lasting Power of Attorney or court-appointed deputyship resulting in legal challenge and non-compliance with the Mental Capacity Act.',
    consequence: 'Procedures performed without lawful authority, exposing clinicians and NNI to claims of battery, complaints to the Singapore Medical Council and adverse court findings.',
    domain: 'Legal & Regulatory',
    impact: 'Moderate',
    likelihood: 'Unlikely',
    owner: 'Adj A/Prof Lim Chee Keong, Head, Department of Neurosurgery',
    institution: 'NNI',
    department: 'Department of Neurosurgery',
    period: 'FY2025Q2',
    currentControls: [
      'Consent policy with a mental capacity assessment form',
      'Best-interests decision pathway for emergency procedures documented by two consultants',
      'Advisory support from the cluster medico-legal unit'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Embed a structured mental capacity assessment template within the EMR consent workflow',
      'Train neurosurgery and neurology registrars annually on Mental Capacity Act requirements'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-12-31',
    actionBy: 'Dr Nur Hidayah binte Ahmad, Associate Consultant, Neurosurgery',
    kris: [
      { text: '% of consents for patients lacking capacity with a documented capacity assessment (target: ≥ 95%)', freq: 'Quarterly' },
      { text: 'Consent-related complaints or legal queries (threshold: > 1 per quarter)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Vanessa Lim, Senior Manager, Medico-Legal'
  },
  {
    id: 'RR-25103',
    statement: 'Disruption to supply of orthopaedic and spinal implants and loan instrument sets due to reliance on a single-source supplier and limited consignment stock on site resulting in postponement of elective surgeries and longer waiting times.',
    consequence: 'Cancellation of scheduled joint replacement and spinal surgeries at short notice, prolonged pain and immobility for patients and loss of theatre utilisation.',
    domain: 'Operations',
    impact: 'Major',
    likelihood: 'Unlikely',
    owner: 'Mr Clement Yap, Director, Supply Chain',
    institution: 'SKH',
    department: 'Supply Chain Management',
    period: 'FY2025Q3',
    currentControls: [
      'Consignment stock with agreed par levels for common implant sizes',
      'Quarterly supplier performance review against contract service levels',
      'Contractual penalties for late delivery of loan sets'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Qualify a second supplier for high-volume orthopaedic implant systems through a cluster tender',
      'Establish four weeks of buffer stock for critical implant sizes'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2026-08-31',
    actionBy: 'Ms Evelyn Tan, Manager, Strategic Sourcing',
    kris: [
      { text: 'Elective surgeries postponed due to implant or instrument unavailability (threshold: > 3 per month)', freq: 'Monthly' },
      { text: 'Supplier on-time-in-full delivery rate (target: ≥ 98%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Dr Wong Kai Ming, Head, Orthopaedic Surgery'
  },
  {
    id: 'RR-25107',
    statement: 'Inability to restore critical oncology systems after a major outage due to untested disaster recovery procedures, incomplete immutable backups of radiotherapy planning and chemotherapy prescribing systems and dependency on a single data centre resulting in prolonged suspension of cancer treatment.',
    consequence: 'Interruption of radiotherapy courses and chemotherapy cycles for days, with clinical impact on tumour control, and possible permanent loss of treatment planning data.',
    domain: 'Information Technology',
    impact: 'Extreme',
    likelihood: 'Rare',
    owner: 'Mr Lawrence Goh, Head, IT Services',
    institution: 'NCCS',
    department: 'Information Technology',
    period: 'FY2025Q3',
    currentControls: [
      'Daily backups of clinical systems managed by Synapxe',
      'Annual disaster recovery test for the EMR',
      'Documented offline downtime procedures for chemotherapy administration'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Conduct a full failover disaster recovery exercise for the oncology information system and chemotherapy prescribing',
      'Implement immutable offline backup copies with quarterly restore tests'
    ],
    addChange: 'Significant improvement',
    targetDate: '2026-11-30',
    actionBy: 'Ms Karen Lim, Senior Manager, Infrastructure (Synapxe)',
    kris: [
      { text: 'Successful restore test rate for critical systems (target: 100%)', freq: 'Quarterly' },
      { text: 'Recovery time achieved in disaster recovery exercise (threshold: > 4 hours)', freq: 'Annually' }
    ],
    monitoredBy: 'Mr Raymond Chng, Chief Information Security Officer'
  },
  {
    id: 'RR-25110',
    statement: 'Conduct of research beyond approved IRB scope or after expiry of approval due to lapses in continuing review submissions and unreported protocol amendments resulting in suspension of studies and research misconduct findings.',
    consequence: 'Data collected outside approval may be unusable, investigators may face disciplinary action and NDCS research capability may be restricted by the IRB.',
    domain: 'Research',
    impact: 'Moderate',
    likelihood: 'Unlikely',
    owner: 'Dr Benedict Chia, Director, Research',
    institution: 'NDCS',
    department: 'Research Office',
    period: 'FY2025Q3',
    currentControls: [
      'IRB reminders issued 60 days before approval expiry',
      'Research Office tracking of active studies and approval dates'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Migrate study tracking to the cluster research management system with automated expiry dashboards',
      'Require an IRB approval check before research billing codes are activated'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2026-10-30',
    actionBy: 'Ms Leong Hui Wen, Research Administrator',
    kris: [
      { text: 'Active studies with lapsed IRB approval (target: 0)', freq: 'Monthly' },
      { text: 'Unreported protocol deviations identified at audit (threshold: > 2 per year)', freq: 'Annually' }
    ],
    monitoredBy: 'A/Prof Teo Swee Huat, Chair, Research Committee'
  },
  {
    id: 'RR-25114',
    statement: 'Flash flooding of ground-floor and basement areas at low-lying polyclinics due to intense monsoon rainfall and blocked drainage resulting in damage to pharmacy stock and electrical and IT equipment and temporary closure of services.',
    consequence: 'Closure of an affected polyclinic for several days, diversion of patients to neighbouring polyclinics and replacement costs for medication stock and equipment.',
    domain: 'Hazard',
    impact: 'Major',
    likelihood: 'Unlikely',
    owner: 'Mr Andrew Seow, Director, Facilities & Development',
    institution: 'SHP',
    department: 'Facilities & Development',
    period: 'FY2025Q3',
    currentControls: [
      'Flood barriers installed at basement ramps of at-risk polyclinics',
      'Subscription to PUB flood alerts with escalation to polyclinic managers',
      'Quarterly drainage inspection by the facilities term contractor'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Relocate the pharmacy bulk store and main switch room above flood level at two high-risk polyclinics',
      'Install water ingress sensors with alerts to the facilities on-call officer'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-11-15',
    actionBy: 'Mr Lim Chin Hock, Manager, Facilities',
    kris: [
      { text: 'Flood incidents causing service disruption (target: 0)', freq: 'Quarterly' },
      { text: '% of drainage inspections completed as scheduled (target: 100%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Nadia binte Kamal, Manager, Business Continuity'
  },
  {
    id: 'RR-25118',
    statement: 'Chemotherapy dosing errors due to incorrect body surface area calculation, outdated patient weight, protocol selection errors in the electronic prescribing module and inconsistent dose rounding resulting in severe toxicity, under-treatment or death of cancer patients.',
    consequence: 'Life-threatening myelosuppression or organ toxicity from overdosing, or reduced treatment efficacy from underdosing, with serious reportable events and medico-legal exposure.',
    domain: 'Clinical',
    impact: 'Extreme',
    likelihood: 'Unlikely',
    owner: 'Dr Ang Swee Leng, Head, Division of Medical Oncology',
    institution: 'NCCS',
    department: 'Division of Medical Oncology',
    period: 'FY2025Q3',
    currentControls: [
      'Electronic chemotherapy protocols with automated dose calculation',
      'Independent pharmacist verification of every chemotherapy order',
      'Two-nurse independent check before administration'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Mandate weight re-measurement within 72 hours of each cycle with a hard stop in the prescribing module',
      'Implement dose-banding for ten high-volume chemotherapy agents'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-07-31',
    actionBy: 'Ms Chloe Tan, Principal Pharmacist (Oncology)',
    kris: [
      { text: 'Chemotherapy prescribing errors intercepted per 1,000 orders (threshold: > 5)', freq: 'Monthly' },
      { text: 'Chemotherapy errors reaching the patient (target: 0)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Leong Pui Yee, Manager, Quality & Patient Safety'
  },
  {
    id: 'RR-25121',
    statement: 'Non-compliance with Healthcare Services Act licensing requirements for newly regulated services due to incomplete mapping of service-specific regulations and late appointment of Clinical Governance Officers resulting in MOH enforcement action and restrictions on service delivery.',
    consequence: 'Directions to cease or modify affected services, financial penalties and delays to the launch of new ambulatory and telehealth services.',
    domain: 'Legal & Regulatory',
    impact: 'Moderate',
    likelihood: 'Possible',
    owner: 'Dr Tan Siew Ling, Director, Clinical Governance',
    institution: 'CGH',
    department: 'Clinical Governance',
    period: 'FY2025Q3',
    currentControls: [
      'HCSA compliance register maintained by the Clinical Governance office',
      'Clinical Governance Officers appointed for all licensable services',
      'Legal review of regulatory requirements before new services are launched'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Complete an HCSA gap assessment for ambulatory surgical, endoscopy and telemedicine services',
      'Implement a licensing calendar with renewal alerts six months ahead'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-12-31',
    actionBy: 'Mr Joel Yeo, Manager, Regulatory Affairs',
    kris: [
      { text: 'Licensable services with open HCSA compliance gaps (threshold: > 2)', freq: 'Quarterly' },
      { text: 'Non-conformities per MOH inspection (threshold: > 3)', freq: 'Ad hoc' }
    ],
    monitoredBy: 'Ms Lim Bee Hoon, Senior Manager, Legal Services'
  },
  {
    id: 'RR-25125',
    statement: 'Inability to fill physiotherapist, occupational therapist and speech therapist positions due to the national shortage of allied health professionals and the lower attractiveness of community care settings resulting in reduced therapy intensity and longer rehabilitation stays.',
    consequence: 'Patients receive fewer therapy minutes than clinically indicated, functional recovery is slower and community hospital beds turn over more slowly, worsening access block at acute hospitals.',
    domain: 'Human Capital',
    impact: 'Moderate',
    likelihood: 'Unlikely',
    owner: 'Ms Charmaine Lee, Director, Rehabilitation Services',
    institution: 'SCH',
    department: 'Rehabilitation Services',
    period: 'FY2025Q3',
    currentControls: [
      'Sign-on bonus for experienced therapists',
      'Rotation partnership with SGH for therapists seeking acute-care exposure'
    ],
    currentEff: 'Minor',
    addControls: [
      'Introduce a therapy assistant role with a structured competency framework to extend therapist capacity',
      'Launch an overseas recruitment drive for physiotherapists',
      'Offer joint appointments with acute hospitals as part of a defined career pathway'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2026-11-30',
    actionBy: 'Mr Jeremy Ho, Senior Manager, Human Resource',
    kris: [
      { text: 'Allied health vacancy rate (threshold: > 10%)', freq: 'Monthly' },
      { text: 'Average therapy minutes per patient per day (target: ≥ 60 minutes)', freq: 'Monthly' },
      { text: 'Annualised voluntary attrition of allied health staff (threshold: > 12%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Dr Koh Wen Jie, Deputy Director, Medical Services'
  },
  {
    id: 'RR-25129',
    statement: 'Unplanned downtime of CT, MRI and PET-CT scanners due to ageing gantry components, cooling system faults and long lead times for vendor parts resulting in postponed staging scans and delays to treatment planning.',
    consequence: 'Rescheduling of staging and response-assessment scans, delays to multidisciplinary tumour board decisions and overtime costs to clear backlogs.',
    domain: 'Technology',
    impact: 'Minor',
    likelihood: 'Likely',
    owner: 'Dr Lee Jia Hui, Head, Oncologic Imaging',
    institution: 'NCCS',
    department: 'Oncologic Imaging',
    period: 'FY2025Q3',
    currentControls: [
      'Vendor service contracts with a 95% uptime guarantee',
      'Scheduled preventive maintenance outside clinical hours',
      'Cross-campus booking arrangement with SGH Diagnostic Radiology during outages'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Negotiate a 98% uptime guarantee with on-site critical spares at contract renewal',
      'Fast-track replacement of the 11-year-old CT scanner in the FY2027 capital plan'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2026-12-31',
    actionBy: 'Mr Eric Toh, Senior Engineer, Biomedical Engineering',
    kris: [
      { text: 'Scanner uptime per modality (target: ≥ 97%)', freq: 'Monthly' },
      { text: 'Staging scans rescheduled due to scanner downtime (threshold: > 20 per month)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Wendy Chan, Manager, Clinical Operations'
  },
  {
    id: 'RR-25132',
    statement: 'Rejection of MediSave and MediShield Life claims due to incomplete clinical documentation, incorrect surgical procedure coding and late submission resulting in delayed receivables, bad debt and higher out-of-pocket payments for patients.',
    consequence: 'Patients receive unexpected bills and lodge complaints, while rejected claims increase aged receivables and administrative rework for the Business Office.',
    domain: 'Financial',
    impact: 'Minor',
    likelihood: 'Possible',
    owner: 'Ms Jacinta Lim, Assistant Director, Finance (Revenue Management)',
    institution: 'CGH',
    department: 'Business Office',
    period: 'FY2025Q3',
    currentControls: [
      'Coder review of high-value inpatient claims before submission',
      'Monthly claim rejection report to department heads'
    ],
    currentEff: 'Minor',
    addControls: [
      'Deploy claims pre-submission validation rules for procedure and diagnosis code consistency',
      'Train surgeons and coders on documentation requirements for the 20 most frequently rejected procedures'
    ],
    addChange: 'Significant improvement',
    targetDate: '2026-12-15',
    actionBy: 'Mr Tan Boon Huat, Manager, Medical Claims',
    kris: [
      { text: 'MediSave and MediShield Life claim rejection rate (threshold: > 3%)', freq: 'Monthly' },
      { text: 'Value of rejected claims outstanding more than 90 days (threshold: > S$250,000)', freq: 'Monthly' }
    ],
    monitoredBy: 'Mr Ignatius Lee, Senior Manager, Finance Controls'
  },
  {
    id: 'RR-25136',
    statement: 'Delayed primary percutaneous coronary intervention for STEMI patients after office hours due to late cath lab team activation, inter-hospital transfer delays and concurrent emergency cases resulting in door-to-balloon times exceeding 90 minutes and increased myocardial damage and mortality.',
    consequence: 'Larger infarct size, heart failure and higher 30-day mortality for affected patients, and failure to meet national STEMI performance indicators.',
    domain: 'Clinical',
    impact: 'Major',
    likelihood: 'Possible',
    owner: 'Dr Kenneth Loh, Director, Cardiac Catheterisation Laboratory',
    institution: 'NHCS',
    department: 'Cardiac Catheterisation Laboratory',
    period: 'FY2025Q3',
    currentControls: [
      'Single-call activation of the STEMI team',
      '24/7 on-call interventional cardiologist and cath lab team',
      'Pre-hospital ECG transmission from SCDF ambulances'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Implement direct cath lab activation from pre-hospital ECG for confirmed STEMI, bypassing the ED',
      'Establish a second on-call cath lab team on weekends and public holidays'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2026-11-20',
    actionBy: 'Ms Toh Li Ying, Nurse Clinician, Cardiac Catheterisation Laboratory',
    kris: [
      { text: '% of primary PCI with door-to-balloon time ≤ 90 minutes (target: ≥ 90%)', freq: 'Monthly' },
      { text: 'Median after-hours team activation-to-arrival time (threshold: > 30 min)', freq: 'Monthly' }
    ],
    monitoredBy: 'Mr Lee Chong Ming, Manager, Clinical Quality'
  },
  {
    id: 'RR-25140',
    statement: 'Failure of legacy neurophysiology and neuro-imaging archive systems due to end-of-support operating systems and unavailable vendor patches resulting in loss of access to historical EEG and imaging studies and exposure to cyber vulnerabilities.',
    consequence: 'Clinicians unable to compare current and prior EEG or imaging studies for epilepsy and neuro-oncology patients, and an exploitable entry point into the cluster network.',
    domain: 'Information Technology',
    impact: 'Moderate',
    likelihood: 'Possible',
    owner: 'Mr Paul Ong, Head, IT',
    institution: 'NNI',
    department: 'Information Technology',
    period: 'FY2025Q3',
    currentControls: [
      'Network segmentation of legacy systems from the clinical network',
      'Compensating controls approved under an IT risk exception',
      'Manual export of critical studies to the enterprise imaging archive on request'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Migrate EEG and neuro-imaging archives to the cluster enterprise imaging platform',
      'Decommission three end-of-life servers hosting legacy applications'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-03-31',
    actionBy: 'Ms Natalie Kwek, Project Manager, Synapxe',
    kris: [
      { text: 'Systems running end-of-support operating systems beyond the approved exception date (target: 0)', freq: 'Quarterly' },
      { text: 'Unpatched critical vulnerabilities on legacy systems (threshold: > 5)', freq: 'Monthly' }
    ],
    monitoredBy: 'Mr Damien Sng, Information Security Officer'
  },
  {
    id: 'RR-25144',
    statement: 'Prolonged waiting times for new-case specialist outpatient appointments due to rising cancer incidence, limited clinic rooms and inefficient allocation of follow-up slots resulting in delayed diagnosis and treatment initiation.',
    consequence: 'Disease progression while awaiting first consultation, patient anxiety, complaints and patients seeking care in the private sector at higher cost.',
    domain: 'Operations',
    impact: 'Moderate',
    likelihood: 'Likely',
    owner: 'Ms Serene Ho, Deputy Director, Clinical Operations',
    institution: 'NCCS',
    department: 'Specialist Outpatient Clinics',
    period: 'FY2025Q3',
    currentControls: [
      'Fast-track pathway for suspected cancer referrals',
      'Weekly review of clinic slot utilisation',
      'Nurse-led follow-up clinics for stable patients'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Shift stable survivorship follow-up to shared care with polyclinics and GPs',
      'Implement predictive appointment scheduling to reduce no-shows'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-12-31',
    actionBy: 'Mr Henry Lau, Manager, Clinic Operations',
    kris: [
      { text: 'Median waiting time for new subsidised appointments (threshold: > 21 days)', freq: 'Monthly' },
      { text: 'Clinic no-show rate (threshold: > 8%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Dr Wee Hui Min, Deputy Director, Medical Services'
  },
  {
    id: 'RR-25147',
    statement: 'Under-delivery of Regional Health System outcomes in the north-east due to misaligned priorities, data-sharing barriers and capacity constraints among community care partners resulting in avoidable readmissions and failure to meet population health targets.',
    consequence: 'Continued high readmission rates among frail elderly residents, weaker case for regional funding and strained relationships with community partners.',
    domain: 'Strategic',
    impact: 'Moderate',
    likelihood: 'Unlikely',
    owner: 'Dr Valerie Tay, Director, Regional Health & Population Health',
    institution: 'SKH',
    department: 'Regional Health System Office',
    period: 'FY2025Q3',
    currentControls: [
      'Partnership agreements with community care partners in the region',
      'Joint governance council meeting quarterly with partner leaders',
      'Community nursing posts embedded in residential estates'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Establish shared care record access for community partners under the cluster data-sharing framework',
      'Introduce joint outcome dashboards with quarterly partner reviews'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2027-01-05',
    actionBy: 'Mr Isaac Chong, Senior Manager, Community Partnerships',
    kris: [
      { text: '30-day unplanned readmission rate for frail elderly residents in the region (threshold: > 12%)', freq: 'Quarterly' },
      { text: '% of community partners with active data-sharing agreements (target: ≥ 80%)', freq: 'Half-yearly' }
    ],
    monitoredBy: 'Ms Leow Hui Ting, Manager, Strategy & Planning'
  },
  {
    id: 'RR-25151',
    statement: 'Hospital-acquired infections including central line-associated bloodstream infections and MRSA transmission due to sub-optimal hand hygiene compliance, inconsistent adherence to the central line maintenance bundle and high bed occupancy limiting isolation resulting in increased morbidity, mortality and length of stay.',
    consequence: 'Each CLABSI adds an estimated 10 to 14 bed-days and carries significant attributable mortality, while MRSA clusters may require ward closures and outbreak notification.',
    domain: 'Clinical',
    impact: 'Major',
    likelihood: 'Possible',
    owner: 'Dr Lim Hui Shan, Head, Infection Prevention & Epidemiology',
    institution: 'SKH',
    department: 'Infection Prevention & Epidemiology',
    period: 'FY2025Q4',
    currentControls: [
      'Monthly hand hygiene audits by trained ward auditors',
      'Central line insertion bundle with checklist in ICU and HDU',
      'MRSA screening on admission for high-risk patients'
    ],
    currentEff: 'Minor',
    addControls: [
      'Implement a central line maintenance bundle with daily line-necessity review in the EMR',
      'Introduce electronic hand hygiene monitoring in ICU and high-dependency wards',
      'Increase isolation room capacity through modular conversion in four wards'
    ],
    addChange: 'Significant improvement',
    targetDate: '2026-12-31',
    actionBy: 'Ms Chan Mei Yee, Senior Nurse Clinician, Infection Control',
    kris: [
      { text: 'CLABSI rate per 1,000 central-line days (threshold: > 1.0)', freq: 'Monthly' },
      { text: 'Hand hygiene compliance (target: ≥ 85%)', freq: 'Monthly' },
      { text: 'Hospital-onset MRSA bacteraemia per 10,000 patient-days (threshold: > 0.3)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Rosalind Tan, Deputy Director, Nursing'
  },
  {
    id: 'RR-25155',
    statement: 'Delays in onboarding foreign-trained nurses due to lengthy Singapore Nursing Board registration processes, competition from other countries for the same source markets and attrition during the conditional registration period resulting in persistent nursing vacancies and ward bed closures.',
    consequence: 'Inability to open funded beds, higher overtime for existing nurses and dependence on costly agency staffing.',
    domain: 'Human Capital',
    impact: 'Major',
    likelihood: 'Possible',
    owner: 'Ms Carol Ng, Director, Nursing',
    institution: 'SKH',
    department: 'Nursing Administration',
    period: 'FY2025Q4',
    currentControls: [
      'Recruitment missions to the Philippines, India and Myanmar',
      'Structured orientation and preceptorship for foreign-trained nurses',
      'Accommodation and relocation support for new hires'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Partner overseas nursing schools on pre-departure preparation for the SNB licensure examination',
      'Introduce a retention bonus tied to completion of conditional registration'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-09-30',
    actionBy: 'Ms Rina Lim, Senior Manager, Talent Acquisition',
    kris: [
      { text: 'Average time from offer acceptance to deployment (threshold: > 6 months)', freq: 'Quarterly' },
      { text: 'Attrition of foreign-trained nurses within the first two years (threshold: > 15%)', freq: 'Half-yearly' }
    ],
    monitoredBy: 'Mr Joseph Ang, Director, Human Resource'
  },
  {
    id: 'RR-25158',
    statement: 'Fire in older clinical blocks of the SGH campus due to ageing electrical installations, oxygen-enriched environments in operating theatres and wards and high fire loads in storage areas resulting in mass evacuation of non-ambulant patients, casualties and loss of critical facilities.',
    consequence: 'Injury or death of patients and staff, prolonged closure of wards and theatres, and severe disruption to national tertiary services delivered at SGH.',
    domain: 'Hazard',
    impact: 'Extreme',
    likelihood: 'Rare',
    owner: 'Mr Ronald Lee, Director, Facilities Management',
    institution: 'SGH',
    department: 'Facilities Management',
    period: 'FY2025Q4',
    currentControls: [
      'Annual fire certificate inspection by SCDF',
      'Fire wardens appointed in every ward with quarterly fire drills including horizontal evacuation',
      'Sprinkler, detection and compartmentation systems maintained under term contract'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Replace electrical distribution boards over 25 years old in Blocks 3, 6 and 7',
      'Conduct oxygen-fire risk assessments and drills for all operating theatres'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-06-30',
    actionBy: 'Mr Muthu s/o Ramasamy, Fire Safety Manager',
    kris: [
      { text: '% of wards completing at least one fire drill per year (target: 100%)', freq: 'Quarterly' },
      { text: 'Fire incidents including small fires and smoke events (threshold: > 2 per year)', freq: 'Annually' },
      { text: 'Fire safety defects outstanding more than 30 days (threshold: > 5)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Faith Chua, Manager, Emergency Preparedness'
  },
  {
    id: 'RR-25162',
    statement: 'Unauthorised access to patient records by staff due to broad role-based access rights, shared workstations left logged in and limited proactive monitoring of access logs resulting in breach of patient confidentiality, PDPC enforcement and disciplinary action.',
    consequence: 'Exposure of sensitive health information of patients, including public figures and staff, with complaints, financial penalties and loss of trust in SNEC.',
    domain: 'Information Technology',
    impact: 'Major',
    likelihood: 'Possible',
    owner: 'Ms Clara Ng, Head, Health Information Management',
    institution: 'SNEC',
    department: 'Health Information Management',
    period: 'FY2025Q4',
    currentControls: [
      'Annual confidentiality and PDPA declaration by all staff',
      'EMR audit trail of all record access',
      'Automatic session log-off on shared workstations after inactivity'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Implement access analytics to flag lookups of VIPs, co-workers and family members with the same surname',
      'Tighten role-based access for non-clinical staff to the minimum data necessary'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2026-10-09',
    actionBy: 'Mr Ivan Teo, Senior Manager, IT Security',
    kris: [
      { text: 'Confirmed inappropriate access cases (threshold: > 2 per quarter)', freq: 'Quarterly' },
      { text: '% of high-risk access alerts reviewed within five working days (target: 100%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Annabelle Kok, Data Protection Officer'
  },
  {
    id: 'RR-25166',
    statement: 'Shortage of critical medical consumables such as intravenous fluids, contrast media and surgical gloves due to global supply chain disruptions, manufacturer recalls and concentration of production in a few countries resulting in rationing, postponement of procedures and compromised patient care.',
    consequence: 'Cancellation of imaging and elective procedures, use of less familiar substitute products with associated error risk, and higher procurement costs from spot buying.',
    domain: 'Operations',
    impact: 'Major',
    likelihood: 'Possible',
    owner: 'Mr Nicholas Tan, Assistant Director, Materials Management',
    institution: 'CGH',
    department: 'Materials Management',
    period: 'FY2025Q4',
    currentControls: [
      'National stockpile and supply coordination through ALPS Healthcare',
      'Minimum eight weeks of inventory for 120 critical items',
      'Product evaluation committee to approve alternative products'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Implement predictive inventory analytics with early-warning alerts for supply disruptions',
      'Pre-qualify substitute products for the top 30 critical items'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2027-03-31',
    actionBy: 'Ms Esther Kang, Manager, Inventory Planning',
    kris: [
      { text: 'Critical items with stock cover below four weeks (threshold: > 5 items)', freq: 'Weekly' },
      { text: 'Procedures postponed due to consumable shortages (target: 0)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Michelle Yong, Deputy Director, Operations'
  },
  {
    id: 'RR-25170',
    statement: 'Transfusion of incompatible blood components due to wrong-blood-in-tube sampling errors, patient misidentification at the bedside and bypassing of electronic positive patient identification resulting in acute haemolytic transfusion reaction and death.',
    consequence: 'Fatal ABO-incompatible transfusion reaction, mandatory serious reportable event notification, coroner’s inquiry and loss of confidence in transfusion safety.',
    domain: 'Clinical',
    impact: 'Extreme',
    likelihood: 'Unlikely',
    owner: 'Dr Kwan Su Lin, Director, Blood Bank',
    institution: 'SGH',
    department: 'Blood Bank, Department of Clinical Pathology',
    period: 'FY2025Q4',
    currentControls: [
      'Electronic positive patient identification with barcoded wristbands for sampling and administration',
      'Two-sample rule before issuing group-specific blood to first-time patients',
      'Transfusion competency assessment for all nurses and doctors who administer blood',
      'Haemovigilance reporting with monthly review by the Hospital Transfusion Committee'
    ],
    currentEff: 'Significant',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: 'Wrong-blood-in-tube rate per 10,000 samples (threshold: > 0.5)', freq: 'Monthly' },
      { text: 'ABO-incompatible transfusions (target: 0)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Patricia Ng, Transfusion Practitioner'
  },
  {
    id: 'RR-25173',
    statement: 'Patient harm from infusion pump malfunction or recalled firmware due to delayed implementation of manufacturer field safety notices and incomplete asset tracking of pumps across wards resulting in over- or under-infusion of high-alert medications.',
    consequence: 'Overdose or interruption of critical infusions such as insulin, heparin and inotropes, with patient injury and product liability disputes with the manufacturer.',
    domain: 'Technology',
    impact: 'Major',
    likelihood: 'Possible',
    owner: 'Mr Benjamin Liew, Head, Biomedical Engineering',
    institution: 'SKH',
    department: 'Biomedical Engineering',
    period: 'FY2025Q4',
    currentControls: [
      'Medical device alert management system with initial action within 48 hours of a field safety notice',
      'Real-time location tracking of all infusion pumps',
      'Smart pumps with drug library and dose error reduction software',
      'Scheduled preventive maintenance and firmware version audits'
    ],
    currentEff: 'Significant',
    addControls: [],
    addChange: '',
    targetDate: '',
    actionBy: '',
    kris: [
      { text: '% of field safety notices fully actioned within 14 days (target: 100%)', freq: 'Ad hoc' },
      { text: 'Drug library compliance rate for smart pump infusions (target: ≥ 95%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Angie Lee, Senior Pharmacist (Medication Safety)'
  },
  {
    id: 'RR-25177',
    statement: 'Major protocol deviations in investigator-initiated cardiovascular trials due to high study coordinator turnover, complex visit schedules and limited monitoring resources resulting in compromised participant safety, unusable data and adverse findings by the Centralised Institutional Review Board.',
    consequence: 'Participants exposed to unmonitored risks, exclusion of data from analyses, and restrictions on new study approvals for affected investigators.',
    domain: 'Research',
    impact: 'Moderate',
    likelihood: 'Likely',
    owner: 'A/Prof Yong Kah Leng, Director, Research & Development Unit',
    institution: 'NHCS',
    department: 'Research & Development Unit',
    period: 'FY2025Q4',
    currentControls: [
      'ICH-GCP training for all study team members',
      'Reporting of protocol deviations to the Centralised Institutional Review Board',
      'External monitoring for HSA-regulated clinical trials'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Implement risk-based monitoring for all investigator-initiated trials',
      'Establish a central pool of trained clinical research coordinators'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-02-28',
    actionBy: 'Ms Sarah Lim, Manager, Clinical Research',
    kris: [
      { text: 'Major protocol deviations per 100 enrolled participants (threshold: > 3)', freq: 'Quarterly' },
      { text: 'Annual turnover of clinical research coordinators (threshold: > 20%)', freq: 'Annually' }
    ],
    monitoredBy: 'Dr Ng Kai Wen, Head, Research Quality'
  },
  {
    id: 'RR-25181',
    statement: 'Prolonged door-to-needle time for intravenous thrombolysis in acute ischaemic stroke due to delays in CT imaging, neurologist review and consent discussions outside office hours resulting in poorer functional outcomes and higher disability.',
    consequence: 'Each 15-minute delay reduces the likelihood of independent functional recovery, increasing long-term disability, caregiver burden and rehabilitation demand.',
    domain: 'Clinical',
    impact: 'Major',
    likelihood: 'Likely',
    owner: 'Dr Chong Yi Lin, Head, Acute Stroke Service',
    institution: 'NNI',
    department: 'Neurology (Acute Stroke Service)',
    period: 'FY2025Q4',
    currentControls: [
      'Code stroke activation on SCDF pre-notification',
      'Direct-to-CT pathway for suspected stroke patients',
      'Standardised tenecteplase dosing with weight-based dosing chart',
      'Monthly door-to-needle performance review with ED and radiology'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Implement tele-stroke consultation for after-hours neurologist review',
      'Place a pharmacist-approved thrombolysis kit in the CT suite'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2026-07-31',
    actionBy: 'Ms Lee Sook Fong, Advanced Practice Nurse, Stroke',
    kris: [
      { text: '% of thrombolysed patients with door-to-needle time ≤ 60 minutes (target: ≥ 80%)', freq: 'Monthly' },
      { text: 'Median door-to-needle time (threshold: > 45 min)', freq: 'Monthly' }
    ],
    monitoredBy: 'Mr Gerald Wong, Manager, Clinical Quality'
  },
  {
    id: 'RR-25184',
    statement: 'Discrepancies and losses in controlled drug stock due to incomplete entries in ward controlled drug registers, unwitnessed wastage of opioid remnants and potential diversion by staff resulting in breach of the Misuse of Drugs Regulations, HSA action and harm from diverted drugs.',
    consequence: 'Regulatory investigation by HSA and CNB, disciplinary and criminal proceedings against staff, and patient or staff harm from diverted opioids.',
    domain: 'Legal & Regulatory',
    impact: 'Major',
    likelihood: 'Unlikely',
    owner: 'Dr Rachel Ong, Head, Department of Pharmacy',
    institution: 'SGH',
    department: 'Pharmacy',
    period: 'FY2025Q4',
    currentControls: [
      'Double-signature entries in ward controlled drug registers',
      'Monthly pharmacy audit of controlled drug registers in all wards',
      'Automated dispensing cabinets in operating theatres and ICUs'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Extend automated dispensing cabinets with biometric access to all inpatient wards',
      'Deploy analytics to detect anomalous opioid withdrawal patterns by user'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-01-31',
    actionBy: 'Mr Lim Wei Jie, Principal Pharmacist (Inpatient Operations)',
    kris: [
      { text: 'Unresolved controlled drug register discrepancies at monthly audit (target: 0)', freq: 'Monthly' },
      { text: '% of wards fully compliant at controlled drug audit (target: ≥ 98%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Joanne Lee, Deputy Director, Patient Safety & Quality'
  },
  {
    id: 'RR-25188',
    statement: 'Loss of key subspecialty expertise in paediatric and congenital cardiothoracic surgery and cardiac electrophysiology due to the impending retirement of senior consultants, a small pool of trained successors and overseas recruitment competition resulting in inability to sustain complex cardiac services.',
    consequence: 'Need to send complex cases overseas, loss of national capability in congenital heart surgery and reduced training capacity for the next generation of specialists.',
    domain: 'Human Capital',
    impact: 'Major',
    likelihood: 'Possible',
    owner: 'Dr Andrew Tan, Deputy Medical Director',
    institution: 'NHCS',
    department: 'Cardiothoracic Surgery',
    period: 'FY2025Q4',
    currentControls: [
      'Overseas subspecialty fellowships under the Health Manpower Development Plan',
      'Re-employment of senior consultants beyond retirement age'
    ],
    currentEff: 'Minor',
    addControls: [
      'Develop named successor plans with funded fellowships for each critical subspecialty',
      'Establish joint appointments with overseas centres to sustain complex case volume',
      'Implement structured knowledge transfer through proctored complex cases'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-04-30',
    actionBy: 'Ms Sylvia Ong, Senior Manager, Medical Workforce',
    kris: [
      { text: 'Critical subspecialties with only one credentialled consultant (threshold: > 1)', freq: 'Half-yearly' },
      { text: 'Named successors in training per critical role (target: ≥ 1)', freq: 'Annually' }
    ],
    monitoredBy: 'Mr Ronald Teo, Director, Human Resource'
  },
  {
    id: 'RR-25192',
    statement: 'Failure to realise the planned transformation to an integrated hospital-to-home rehabilitation model due to a limited home-care workforce, immature remote monitoring workflows and uncertain funding mechanisms resulting in sustained bed demand and missed targets for community-based care.',
    consequence: 'Community hospital beds remain the default for rehabilitation, prolonging waits for step-down transfer from acute hospitals and limiting capacity growth.',
    domain: 'Strategic',
    impact: 'Moderate',
    likelihood: 'Possible',
    owner: 'Dr Patricia Chan, Deputy Director, Medical Services',
    institution: 'SCH',
    department: 'Medical Services',
    period: 'FY2025Q4',
    currentControls: [
      'Transformation steering committee chaired by the CEO',
      'Pilot hospital-to-home rehabilitation programme in two wards',
      'Funding proposal submitted to MOH for home rehabilitation episodes'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Scale home rehabilitation teams with cross-trained therapy assistants',
      'Agree a funding model with MOH for Mobile Inpatient Care@Home rehabilitation episodes'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-03-31',
    actionBy: 'Mr Leslie Goh, Manager, Transformation Office',
    kris: [
      { text: 'Patients enrolled in hospital-to-home rehabilitation (target: ≥ 40 per month)', freq: 'Monthly' },
      { text: 'Average length of stay for rehabilitation admissions (threshold: > 24 days)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Angeline Chew, Deputy Director, Operations'
  },
  {
    id: 'RR-25195',
    statement: 'Adverse mainstream and social media coverage of long Emergency Department waiting times due to sustained high attendances, long waits for inpatient beds and patient-shared videos of crowded holding areas resulting in loss of public confidence and increased complaints.',
    consequence: 'Parliamentary questions and media queries, rise in complaints and pressure on staff morale during peak periods.',
    domain: 'Reputation',
    impact: 'Minor',
    likelihood: 'Possible',
    owner: 'Ms Nicole Wong, Head, Corporate Communications',
    institution: 'CGH',
    department: 'Corporate Communications',
    period: 'FY2025Q4',
    currentControls: [
      'Live ED waiting times published on the CGH website and mobile app',
      'Pre-approved media holding statements for ED crowding',
      'Daily ED crowding huddle with Operations and Nursing'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Run a proactive public education campaign on appropriate ED use, promoting GP and polyclinic alternatives'
    ],
    addChange: 'Minor improvement',
    targetDate: '2027-02-15',
    actionBy: 'Mr Daryl Lim, Manager, Media Relations',
    kris: [
      { text: 'Negative media articles on ED waiting times (threshold: > 2 per quarter)', freq: 'Quarterly' },
      { text: '% of Priority 3 patients seen within two hours (target: ≥ 80%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Dr Ivan Lim, Head, Emergency Medicine'
  },
  {
    id: 'RR-25198',
    statement: 'Dispensing of medications to the wrong patient at the outpatient pharmacy due to similar patient names, queue number mix-ups during peak hours and incomplete two-identifier checks at collection resulting in patients taking medications not prescribed for them.',
    consequence: 'Adverse drug reactions or missed doses for both patients involved, breach of patient confidentiality and complaints to the institution.',
    domain: 'Operations',
    impact: 'Moderate',
    likelihood: 'Possible',
    owner: 'Dr Rachel Ong, Head, Department of Pharmacy',
    institution: 'SGH',
    department: 'Pharmacy',
    period: 'FY2025Q4',
    currentControls: [
      'Two patient identifiers verified at collection',
      'Barcode scan of the medication bag against the queue ticket',
      'Pharmacist counselling at collection for new medications'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Introduce identity card or Singpass scan at the collection counter linked to the prescription bag barcode',
      'Route patients flagged with similar-name alerts to a dedicated collection counter'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2027-01-29',
    actionBy: 'Ms Nurul Aisyah binte Rahman, Senior Pharmacist (Outpatient Pharmacy)',
    kris: [
      { text: 'Wrong-patient dispensing incidents (target: 0)', freq: 'Monthly' },
      { text: 'Two-identifier compliance at collection on observational audit (target: ≥ 98%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Mr Daniel Koh, Manager, Quality Management'
  },
  {
    id: 'RR-26005',
    statement: 'Extended outage of the polyclinic clinical and appointment systems managed by Synapxe due to infrastructure failure, failed change deployments or network disruption resulting in suspension of consultations, prescribing and payment across multiple polyclinics.',
    consequence: 'Hundreds of patients per polyclinic turned away or delayed, risk of prescribing without medication history and backlog of documentation after recovery.',
    domain: 'Information Technology',
    impact: 'Major',
    likelihood: 'Unlikely',
    owner: 'Mr Kelvin Ang, Director, IT & Digital',
    institution: 'SHP',
    department: 'Information Technology',
    period: 'FY2026Q1',
    currentControls: [
      'Downtime procedures with paper consultation and prescription forms at every polyclinic',
      'Read-only replica of patient records accessible during outages',
      'Change advisory board review of all production changes'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Conduct cluster-wide downtime simulation exercises twice a year',
      'Implement a local cache of medication lists and appointment schedules at each polyclinic'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2027-05-31',
    actionBy: 'Ms Pauline Chua, Manager, IT Service Management',
    kris: [
      { text: 'Unplanned clinical system downtime (threshold: > 60 min per quarter)', freq: 'Quarterly' },
      { text: 'Failed changes causing service incidents (threshold: > 1 per quarter)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Nadia binte Kamal, Manager, Business Continuity'
  },
  {
    id: 'RR-26009',
    statement: 'Delayed recognition and escalation of deteriorating inpatients due to incomplete vital signs documentation, inconsistent use of the National Early Warning Score and hesitancy to activate the rapid response team after hours resulting in unplanned ICU admissions, cardiac arrests and avoidable deaths.',
    consequence: 'Preventable in-hospital cardiac arrests and deaths, longer ICU stays and serious incident reviews citing failure to rescue.',
    domain: 'Clinical',
    impact: 'Extreme',
    likelihood: 'Possible',
    owner: 'Dr Ng Boon Kiat, Head, Intensive Care Medicine',
    institution: 'SKH',
    department: 'Intensive Care Medicine',
    period: 'FY2026Q1',
    currentControls: [
      'NEWS charting embedded in the EMR with colour-coded triggers',
      '24/7 rapid response team led by an ICU registrar',
      'Escalation algorithm displayed in all wards'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Implement continuous wireless vital signs monitoring in general wards with automatic NEWS escalation',
      'Mandate senior doctor review of every NEWS of 7 or above within 30 minutes'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-03-31',
    actionBy: 'Ms Sim Lay Hoon, Nurse Clinician, Rapid Response Team',
    kris: [
      { text: 'Cardiac arrests outside ICU per 1,000 admissions (threshold: > 1.5)', freq: 'Monthly' },
      { text: '% of NEWS ≥ 7 escalated within 30 minutes (target: ≥ 90%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Rosalind Tan, Deputy Director, Nursing'
  },
  {
    id: 'RR-26014',
    statement: 'Exposure of immunocompromised patients to airborne fungal spores from campus redevelopment and renovation works due to inadequate dust containment, negative pressure failures and poor coordination of works near clinical areas resulting in invasive aspergillosis and other construction-related infections.',
    consequence: 'Life-threatening fungal infections among haematology, transplant and ICU patients, outbreak investigations and work stoppages delaying campus redevelopment milestones.',
    domain: 'Hazard',
    impact: 'Major',
    likelihood: 'Possible',
    owner: 'Ms Cheong Pei Wen, Director, Campus Development',
    institution: 'SGH',
    department: 'Campus Development',
    period: 'FY2026Q1',
    currentControls: [
      'Infection control risk assessment required before any construction or renovation works',
      'Dust barriers and sealed hoarding around works adjacent to clinical areas',
      'Portable HEPA filtration in high-risk wards near construction zones'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Mandate continuous particle count monitoring adjacent to haematology and transplant wards during works',
      'Require infection control sign-off at each construction phase gate'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2027-04-30',
    actionBy: 'Mr Lau Teck Seng, Project Manager, Campus Development',
    kris: [
      { text: 'Healthcare-associated invasive aspergillosis cases in high-risk units (target: 0)', freq: 'Monthly' },
      { text: '% of construction works with a completed infection control risk assessment before commencement (target: 100%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Dr Tan Yi Xin, Senior Consultant, Infection Prevention & Epidemiology'
  },
  {
    id: 'RR-26018',
    statement: 'Failure of cardiac catheterisation laboratory imaging systems during emergency procedures due to ageing X-ray tubes, detector faults and software failures resulting in aborted interventions, patient harm and diversion of STEMI cases.',
    consequence: 'Patients left with incompletely treated coronary occlusions mid-procedure, emergency transfer to another lab and potential mortality.',
    domain: 'Technology',
    impact: 'Extreme',
    likelihood: 'Possible',
    owner: 'Mr Victor Ho, Head, Biomedical Engineering',
    institution: 'NHCS',
    department: 'Biomedical Engineering',
    period: 'FY2026Q1',
    currentControls: [
      'Six cath labs on site allowing immediate redirection of cases',
      'Vendor contract with four-hour on-site response',
      'Preventive X-ray tube replacement schedule based on usage hours',
      'Uninterruptible power supply for all cath lab imaging systems'
    ],
    currentEff: 'Significant',
    addControls: [
      'Implement remote predictive diagnostics with the vendor for X-ray tube life monitoring'
    ],
    addChange: 'Minor improvement',
    targetDate: '2027-06-30',
    actionBy: 'Ms Cheryl Lee, Senior Engineer, Biomedical Engineering',
    kris: [
      { text: 'Procedures aborted due to equipment failure (target: 0)', freq: 'Monthly' },
      { text: 'Cath lab imaging system uptime (target: ≥ 99%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Dr Kenneth Loh, Director, Cardiac Catheterisation Laboratory'
  },
  {
    id: 'RR-26021',
    statement: 'Attrition of family physicians from polyclinics due to high patient loads, the administrative burden of Healthier SG enrolment and attractive private sector opportunities resulting in longer waiting times and reduced continuity of care.',
    consequence: 'Loss of experienced family physicians who anchor chronic disease teams, longer queues and difficulty sustaining Healthier SG commitments.',
    domain: 'Human Capital',
    impact: 'Moderate',
    likelihood: 'Possible',
    owner: 'Dr Ho Wei Ling, Director, Clinical Services',
    institution: 'SHP',
    department: 'Family Medicine',
    period: 'FY2026Q1',
    currentControls: [
      'Exit interviews conducted for departing family physicians',
      'Annual review of family physician manpower requirements against projected attendances'
    ],
    currentEff: 'Minimal',
    addControls: [
      'Introduce team-based care with care coordinators to take over administrative tasks',
      'Revise the family physician career track with protected time for teaching and research',
      'Benchmark remuneration against the private sector annually'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-03-31',
    actionBy: 'Ms Tan Shu Hui, Senior Manager, Human Resource',
    kris: [
      { text: 'Annualised attrition rate of family physicians (threshold: > 12%)', freq: 'Quarterly' },
      { text: 'Average patients seen per doctor per session (threshold: > 30)', freq: 'Monthly' }
    ],
    monitoredBy: 'Dr Ow Yong Hui, Deputy Director, Family Medicine'
  },
  {
    id: 'RR-26025',
    statement: 'Recurrent shortages of essential medicines including antibiotics, oncology drugs and anaesthetic agents due to global manufacturing disruptions, sole-supplier products and limited national buffer stocks resulting in therapeutic substitution, treatment delays and increased risk of medication errors.',
    consequence: 'Use of less familiar alternatives with different dosing, delayed treatment for some patients and higher costs from emergency procurement.',
    domain: 'Operations',
    impact: 'Moderate',
    likelihood: 'Frequent',
    owner: 'Dr Rachel Ong, Head, Department of Pharmacy',
    institution: 'SGH',
    department: 'Pharmacy',
    period: 'FY2026Q1',
    currentControls: [
      'ALPS Healthcare shortage alerts and cluster-level allocation of scarce stock',
      'Therapeutic substitution guidelines approved by the Pharmacy & Therapeutics Committee',
      'Three months of safety stock for critical medicines'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Develop a shortage early-warning dashboard integrating ALPS, vendor and consumption data',
      'Pre-approve therapeutic alternatives for the 50 most shortage-prone medicines'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2027-02-28',
    actionBy: 'Mr Jonathan Seah, Pharmacy Manager (Procurement & Inventory)',
    kris: [
      { text: 'Active drug shortages affecting patient care (threshold: > 10)', freq: 'Weekly' },
      { text: 'Shortage-related medication incidents (threshold: > 2 per month)', freq: 'Monthly' }
    ],
    monitoredBy: 'Dr Vivian Lee, Chair, Pharmacy & Therapeutics Committee'
  },
  {
    id: 'RR-26029',
    statement: 'Leakage of patient personal data through misdirected emails, unsecured file attachments and incorrect mail merges due to manual handling of patient correspondence and the absence of data loss prevention controls resulting in PDPA breaches, mandatory notification to the PDPC and patient distress.',
    consequence: 'Disclosure of diagnoses and identification numbers to unintended recipients, financial penalties and erosion of patient trust in NHCS.',
    domain: 'Information Technology',
    impact: 'Major',
    likelihood: 'Likely',
    owner: 'Mr Gordon Lim, Head, IT',
    institution: 'NHCS',
    department: 'Information Technology',
    period: 'FY2026Q1',
    currentControls: [
      'Warning banner on emails addressed to external recipients',
      'Password protection required for attachments containing patient data',
      'Annual PDPA e-learning for all staff'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Deploy data loss prevention that automatically blocks NRIC and diagnosis data sent to external domains',
      'Replace manual mail merges with secure patient portal messaging'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-01-31',
    actionBy: 'Mr Ryan Kwok, Senior Manager, IT Security',
    kris: [
      { text: 'Data breach incidents notifiable to the PDPC (target: 0)', freq: 'Monthly' },
      { text: 'Misdirected email incidents (threshold: > 3 per quarter)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Teresa Yong, Data Protection Officer'
  },
  {
    id: 'RR-26033',
    statement: 'Delayed recognition and management of massive postpartum haemorrhage due to underestimation of blood loss, delays in activating the obstetric haemorrhage protocol and inconsistent after-hours availability of blood products in the delivery suite resulting in maternal morbidity, hysterectomy or maternal death.',
    consequence: 'Loss of fertility through emergency hysterectomy, ICU admission or maternal death, with national-level scrutiny and medico-legal consequences.',
    domain: 'Clinical',
    impact: 'Extreme',
    likelihood: 'Possible',
    owner: 'A/Prof Lee Siew Ming, Head, Department of Obstetrics & Gynaecology',
    institution: 'KKH',
    department: 'Delivery Suite',
    period: 'FY2026Q1',
    currentControls: [
      'Obstetric haemorrhage protocol with visual blood loss estimation charts',
      'Massive transfusion protocol with the hospital blood bank'
    ],
    currentEff: 'Minor',
    addControls: [
      'Implement quantitative blood loss measurement for all deliveries',
      'Introduce monthly multidisciplinary postpartum haemorrhage simulation drills',
      'Station an emergency O-negative blood refrigerator in the delivery suite'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-02-28',
    actionBy: 'Ms Norhayati binte Salleh, Nurse Clinician, Delivery Suite',
    kris: [
      { text: 'Massive postpartum haemorrhage (≥ 1,500 mL) per 1,000 deliveries (threshold: > 6)', freq: 'Monthly' },
      { text: '% of deliveries with quantitative blood loss measured (target: ≥ 90%)', freq: 'Monthly' },
      { text: 'Maternal deaths (target: 0)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Dr Goh Swee Chin, Director, Patient Safety'
  },
  {
    id: 'RR-26037',
    statement: 'Widening operating deficit due to manpower cost increases from salary revisions, higher drug and consumable prices and growth in subsidised workload outpacing MOH subvention resulting in inability to fund planned service expansion and reliance on cluster reserves.',
    consequence: 'Deferral of new services and capital projects, tighter headcount controls and difficult trade-offs between access and financial sustainability.',
    domain: 'Financial',
    impact: 'Extreme',
    likelihood: 'Likely',
    owner: 'Mr Kelvin Soh, Director, Finance',
    institution: 'SKH',
    department: 'Finance',
    period: 'FY2026Q1',
    currentControls: [
      'Annual budget workplan agreed with MOH',
      'Monthly review of financial performance by the Finance Committee',
      'Productivity targets set for clinical and support departments'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Implement cost-per-case benchmarking across the top 30 diagnosis-related groups',
      'Introduce a zero-based review of outsourced service contracts'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2027-03-31',
    actionBy: 'Ms Angela Chan, Assistant Director, Financial Planning & Analysis',
    kris: [
      { text: 'Operating deficit against budget (threshold: > 2% adverse variance)', freq: 'Monthly' },
      { text: 'Manpower cost as % of operating expenditure (threshold: > 62%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Elsie Tan, Senior Manager, Group Finance'
  },
  {
    id: 'RR-26041',
    statement: 'Frequent breakdowns of outpatient pharmacy robotic dispensing and automated packing systems due to ageing hardware, software integration errors with the EMR and limited after-hours vendor support resulting in longer patient waiting times and manual workarounds.',
    consequence: 'Waiting times at the outpatient pharmacy double during breakdowns, increasing manual picking workload and the risk of dispensing errors.',
    domain: 'Technology',
    impact: 'Minor',
    likelihood: 'Frequent',
    owner: 'Mr Alex Wee, Deputy Head, Pharmacy (Operations & Automation)',
    institution: 'SGH',
    department: 'Pharmacy',
    period: 'FY2026Q1',
    currentControls: [
      'Vendor maintenance contract with four-hour response',
      'Manual dispensing contingency procedure',
      'Daily system health checks before pharmacy opening'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Upgrade the robot control software and EMR interface engine',
      'Negotiate extended-hours on-site vendor engineer support'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-04-30',
    actionBy: 'Ms Charlene Yap, Manager, Pharmacy Informatics',
    kris: [
      { text: 'Robot unplanned downtime (threshold: > 6 hours per month)', freq: 'Monthly' },
      { text: '% of outpatient prescriptions collected within 30 minutes (target: ≥ 85%)', freq: 'Weekly' }
    ],
    monitoredBy: 'Mr Daniel Koh, Manager, Quality Management'
  },
  {
    id: 'RR-26044',
    statement: 'Excessive overtime and fatigue among Emergency Department nurses due to persistent vacancies, high attendances and boarding of admitted patients in the ED resulting in burnout, sick leave, errors and resignations.',
    consequence: 'A self-reinforcing cycle of resignations and further overtime, with fatigue-related errors in triage and medication administration.',
    domain: 'Human Capital',
    impact: 'Moderate',
    likelihood: 'Frequent',
    owner: 'Ms Doris Lim, Deputy Director, Nursing',
    institution: 'CGH',
    department: 'Emergency Department',
    period: 'FY2026Q1',
    currentControls: [
      'Overtime approval by the nurse manager on duty',
      'Use of nursing pool and agency nurses during peak periods'
    ],
    currentEff: 'Minor',
    addControls: [
      'Cap individual overtime at 72 hours per month using roster analytics',
      'Recruit 15 additional ED nurses and establish an ED float pool',
      'Introduce a peer support and psychological first aid programme'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-01-29',
    actionBy: 'Ms Kalaiselvi d/o Murugan, Nurse Manager, Emergency Department',
    kris: [
      { text: 'Average overtime hours per ED nurse (threshold: > 40 hours per month)', freq: 'Monthly' },
      { text: 'Annualised ED nursing turnover (threshold: > 15%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Mr Clement Choo, Senior Manager, Human Resource'
  },
  {
    id: 'RR-26048',
    statement: 'Shortfall in Healthier SG enrolment and health plan completion targets due to resident preference for private GPs, limited polyclinic appointment capacity and incomplete onboarding of enrolled residents resulting in failure to meet MOH population health outcomes and capitation-linked funding.',
    consequence: 'Reduced capitation funding, weaker chronic disease prevention outcomes in the eastern region and reputational impact on SHP as the anchor primary care provider.',
    domain: 'Strategic',
    impact: 'Moderate',
    likelihood: 'Likely',
    owner: 'Dr Lim Kok Seng, Director, Population Health',
    institution: 'SHP',
    department: 'Population Health',
    period: 'FY2026Q1',
    currentControls: [
      'Dedicated enrolment teams at each polyclinic',
      'Digital onboarding via HealthHub with SMS reminders',
      'Monthly tracking of enrolment and onboarding KPIs by senior management'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Introduce nurse-led health plan sessions to increase completion',
      'Partner community organisations for outreach in under-enrolled estates'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2027-03-31',
    actionBy: 'Ms Ng Pei Ling, Senior Manager, Healthier SG Programme Office',
    kris: [
      { text: '% of enrolled residents with a completed health plan within six months (target: ≥ 70%)', freq: 'Monthly' },
      { text: 'Enrolment achieved against annual target (target: ≥ 95%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Leong Siew Wah, Manager, Strategy & Planning'
  },
  {
    id: 'RR-26052',
    statement: 'Administration errors involving high-alert medications such as insulin, anticoagulants, concentrated electrolytes and opioids due to complex dosing regimens, look-alike concentrations and inconsistent independent double-checks on wards resulting in severe hypoglycaemia, bleeding, cardiac arrest or death.',
    consequence: 'Serious and potentially fatal harm from a single administration error, serious reportable event investigation and medico-legal exposure.',
    domain: 'Clinical',
    impact: 'Extreme',
    likelihood: 'Possible',
    owner: 'Dr Rachel Ong, Head, Department of Pharmacy',
    institution: 'SGH',
    department: 'Pharmacy',
    period: 'FY2026Q1',
    currentControls: [
      'High-alert medication policy with an approved list and storage requirements',
      'Independent double-check by two nurses before administration',
      'Concentrated potassium chloride removed from ward stock',
      'Smart infusion pumps with dose limits for high-alert infusions'
    ],
    currentEff: 'Substantial',
    addControls: [
      'Implement electronic insulin and heparin dosing protocols with clinical decision support in the EMR',
      'Introduce barcode medication administration scanning for all high-alert medications'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-02-28',
    actionBy: 'Ms Tan Hui Min, Senior Pharmacist (Medication Safety)',
    kris: [
      { text: 'High-alert medication incidents reaching patients per 1,000 admissions (threshold: > 0.8)', freq: 'Monthly' },
      { text: 'Severe hypoglycaemia (glucose < 3 mmol/L) per 1,000 insulin patient-days (threshold: > 2)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Joanne Lee, Deputy Director, Patient Safety & Quality'
  },
  {
    id: 'RR-26056',
    statement: 'Inability to sustain essential services during a pandemic surge at DORSCON Orange or Red due to limited isolation capacity, PPE and staff shortages from infection and quarantine, and reduced surge bed readiness since COVID-19 resulting in suspension of elective services and compromised patient and staff safety.',
    consequence: 'Healthcare worker infections, overwhelmed ED and ICU capacity, and prolonged suspension of elective surgery and specialist clinics.',
    domain: 'Hazard',
    impact: 'Extreme',
    likelihood: 'Unlikely',
    owner: 'Dr Ong Kian Wee, Director, Emergency Preparedness',
    institution: 'SKH',
    department: 'Emergency Preparedness & Business Continuity',
    period: 'FY2026Q1',
    currentControls: [
      'Pandemic preparedness plan aligned to DORSCON levels',
      'Three-month PPE stockpile with rotation',
      'Annual pandemic tabletop exercise with MOH participation'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Conduct a full-scale surge exercise converting two wards to isolation wards within 72 hours',
      'Establish a redeployment registry of pre-trained staff for isolation wards'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-05-31',
    actionBy: 'Ms Wong Li Chin, Manager, Emergency Preparedness',
    kris: [
      { text: 'Days of PPE stockpile on hand (target: ≥ 90 days)', freq: 'Monthly' },
      { text: '% of redeployable staff with current isolation ward training (target: ≥ 80%)', freq: 'Half-yearly' }
    ],
    monitoredBy: 'Mr Paul Seet, Deputy Director, Operations'
  },
  {
    id: 'RR-26060',
    statement: 'Delayed or sub-optimal commissioning of the new general hospital campus in the East due to construction delays, insufficient manpower recruitment ahead of opening and immature operational readiness planning resulting in delayed relief of capacity pressure and costly operational inefficiencies.',
    consequence: 'Continued bed shortfall in the eastern region, unsafe phased opening if systems and staff are not ready, and cost overruns from extended dual running.',
    domain: 'Strategic',
    impact: 'Extreme',
    likelihood: 'Possible',
    owner: 'Mr Philip Koh, Director, New Campus Planning Office',
    institution: 'CGH',
    department: 'New Campus Planning Office',
    period: 'FY2026Q2',
    currentControls: [
      'Monthly project steering committee chaired by the CEO',
      'MOH-led project governance and reporting'
    ],
    currentEff: 'Minor',
    addControls: [
      'Establish an integrated operational readiness programme with clinical leads for each service line',
      'Front-load recruitment and training of 600 staff 18 months before opening',
      'Commission an independent schedule risk assessment'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-09-30',
    actionBy: 'Ms Esther Lau, Head, Operational Readiness',
    kris: [
      { text: 'Construction schedule variance against master programme (threshold: > 3 months)', freq: 'Monthly' },
      { text: '% of opening manpower recruited against plan (target: ≥ 90%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Mr Gavin Ng, Senior Manager, Strategy & Planning'
  },
  {
    id: 'RR-26063',
    statement: 'Compromise of staff email and system accounts through phishing and business email compromise due to sophisticated social engineering, incomplete multi-factor authentication coverage and low reporting of suspicious emails resulting in unauthorised access to patient data and fraudulent payment requests.',
    consequence: 'Exfiltration of patient records, fraudulent changes to vendor bank details leading to financial loss, and use of compromised accounts as a foothold for ransomware.',
    domain: 'Information Technology',
    impact: 'Major',
    likelihood: 'Frequent',
    owner: 'Ms Joanna Chia, Head, IT',
    institution: 'KKH',
    department: 'Information Technology',
    period: 'FY2026Q2',
    currentControls: [
      'Email filtering and sandboxing of attachments',
      'Quarterly phishing simulation exercises for all staff',
      'Multi-factor authentication for remote access'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Enforce phishing-resistant multi-factor authentication for all staff accounts, including on-premise email access',
      'Provide targeted coaching for staff who fail phishing simulations twice'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-02-28',
    actionBy: 'Mr Shawn Tay, Manager, IT Security',
    kris: [
      { text: '% of staff completing phishing simulation without clicking (target: ≥ 95%)', freq: 'Quarterly' },
      { text: 'Compromised accounts detected (threshold: > 1 per month)', freq: 'Monthly' },
      { text: '% of staff accounts with multi-factor authentication enabled (target: 100%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Mr Raymond Chng, Chief Information Security Officer'
  },
  {
    id: 'RR-26067',
    statement: 'Inpatient falls with injury due to the increasing proportion of elderly patients with delirium and frailty, inconsistent falls risk reassessment and delayed response to bed-exit alarms resulting in fractures, head injuries, prolonged hospitalisation and death.',
    consequence: 'Hip fractures and intracranial haemorrhage requiring surgery, longer length of stay, loss of independence on discharge and complaints from families.',
    domain: 'Clinical',
    impact: 'Major',
    likelihood: 'Likely',
    owner: 'Ms Siti Aminah binte Yusoff, Director, Nursing',
    institution: 'SGH',
    department: 'Nursing',
    period: 'FY2026Q2',
    currentControls: [
      'Morse Fall Scale assessment on admission',
      'Hourly intentional rounding in high-risk wards',
      'Low beds and bed-exit alarms in geriatric wards'
    ],
    currentEff: 'Minor',
    addControls: [
      'Deploy AI-enabled video monitoring for high-risk patients in six geriatric wards',
      'Introduce delirium screening with the 4AT and a targeted prevention bundle',
      'Mandate a post-fall huddle within 24 hours of every fall'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-03-31',
    actionBy: 'Ms Chong Mei Ling, Nurse Clinician, Falls Prevention',
    kris: [
      { text: 'Patient falls with harm per 1,000 patient-days (threshold: > 0.3)', freq: 'Monthly' },
      { text: 'Falls risk reassessment compliance (target: ≥ 95%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Mr Daniel Koh, Manager, Quality Management'
  },
  {
    id: 'RR-26071',
    statement: 'Verbal and physical abuse of healthcare workers by patients and caregivers due to long waiting times, high-stress paediatric and maternity emergencies and low awareness of zero-tolerance policies resulting in staff injury, psychological distress and attrition.',
    consequence: 'Physical injury and trauma to frontline nurses and doctors, increased sick leave and resignations, and difficulty recruiting into Children’s Emergency.',
    domain: 'Human Capital',
    impact: 'Major',
    likelihood: 'Likely',
    owner: 'Ms Lim Bee Choo, Director, Human Resource',
    institution: 'KKH',
    department: 'Human Resource',
    period: 'FY2026Q2',
    currentControls: [
      'Zero-tolerance posters in clinical areas',
      'Security escalation procedure for aggressive visitors',
      'Incident reporting of abuse through the incident reporting system'
    ],
    currentEff: 'Minor',
    addControls: [
      'Implement the tripartite framework on workplace violence, including de-escalation training for frontline staff',
      'Install duress alarms and issue body-worn cameras to security officers in Children’s Emergency',
      'Flag repeat abusers in the EMR with a care and behaviour plan'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-01-15',
    actionBy: 'Mr Steven Neo, Manager, Security',
    kris: [
      { text: 'Reported incidents of abuse against staff (threshold: > 30 per month)', freq: 'Monthly' },
      { text: '% of frontline staff trained in de-escalation (target: ≥ 90%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Linda Soh, Deputy Director, Nursing'
  },
  {
    id: 'RR-26074',
    statement: 'Viral social media posts alleging negligence in maternal or paediatric care due to delayed or poorly coordinated responses to serious patient complaints and limited real-time social media monitoring resulting in sustained negative national media coverage and loss of public trust.',
    consequence: 'National media and parliamentary attention, hostility towards named staff online and reduced public confidence in KKH as the national women’s and children’s hospital.',
    domain: 'Reputation',
    impact: 'Extreme',
    likelihood: 'Unlikely',
    owner: 'Ms Clarissa Wong, Director, Corporate Communications',
    institution: 'KKH',
    department: 'Corporate Communications',
    period: 'FY2026Q2',
    currentControls: [
      'Complaints management policy with a five-working-day response standard',
      'Media holding statement templates'
    ],
    currentEff: 'Minor',
    addControls: [
      'Deploy a 24/7 social listening tool with an escalation matrix to senior management',
      'Establish a rapid-response team for serious incident communications covering clinical, legal and patient relations',
      'Train department heads on open disclosure and media handling'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-01-31',
    actionBy: 'Mr Aaron Lee, Manager, Digital Communications',
    kris: [
      { text: 'Time from detection of a viral post to first official response (target: ≤ 4 hours)', freq: 'Ad hoc' },
      { text: 'Negative social media mentions (threshold: > 50 per month)', freq: 'Monthly' }
    ],
    monitoredBy: 'Ms Faridah binte Mohd Noor, Head, Patient Relations'
  },
  {
    id: 'RR-26078',
    statement: 'Patient harm or inequitable outcomes from AI-enabled clinical tools due to model performance drift, insufficient local validation, automation bias among clinicians and unclear accountability for AI-assisted decisions resulting in missed diagnoses, regulatory non-compliance and erosion of clinician and patient trust.',
    consequence: 'Missed findings on AI-triaged imaging or inappropriate treatment recommendations, HSA action on software as a medical device and suspension of AI programmes.',
    domain: 'Technology',
    impact: 'Major',
    likelihood: 'Possible',
    owner: 'A/Prof Daniel Chew, Head, Clinical AI Governance',
    institution: 'SGH',
    department: 'Clinical AI Office',
    period: 'FY2026Q2',
    currentControls: [
      'AI governance committee review and approval before clinical deployment',
      'Alignment with MOH Artificial Intelligence in Healthcare Guidelines',
      'HSA registration for AI tools classified as software as a medical device'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Implement post-deployment performance monitoring with drift alerts for all production AI models',
      'Mandate clinician training on AI limitations and documentation of overrides',
      'Establish an AI-specific category in the incident reporting system'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-06-30',
    actionBy: 'Dr Melissa Tan, Lead Data Scientist',
    kris: [
      { text: 'Production AI models performing below their validated AUC threshold (target: 0)', freq: 'Monthly' },
      { text: '% of AI tools in production with completed local validation (target: 100%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Ms Joanne Lee, Deputy Director, Patient Safety & Quality'
  },
  {
    id: 'RR-26082',
    statement: 'Delayed recognition and treatment of sepsis in the Emergency Department due to triage overcrowding, atypical presentations in elderly patients and inconsistent use of sepsis screening tools resulting in delayed antibiotics, septic shock and preventable deaths.',
    consequence: 'Each hour of delay to antibiotics in septic shock raises mortality, with prolonged ICU stays and serious incident reviews for missed sepsis.',
    domain: 'Clinical',
    impact: 'Extreme',
    likelihood: 'Likely',
    owner: 'Dr Ivan Lim, Head, Emergency Medicine',
    institution: 'CGH',
    department: 'Emergency Medicine',
    period: 'FY2026Q2',
    currentControls: [
      'Sepsis screening at triage using qSOFA criteria',
      'Sepsis order set available in the EMR'
    ],
    currentEff: 'Minor',
    addControls: [
      'Implement an EMR-based automated sepsis alert with a nurse-initiated sepsis bundle',
      'Hold monthly sepsis case reviews with feedback to ED teams',
      'Introduce point-of-care lactate testing at triage'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-02-26',
    actionBy: 'Ms Jasmine Koh, Advanced Practice Nurse, Emergency Medicine',
    kris: [
      { text: '% of sepsis patients receiving antibiotics within one hour of recognition (target: ≥ 80%)', freq: 'Monthly' },
      { text: 'In-hospital sepsis mortality (threshold: > 18%)', freq: 'Quarterly' }
    ],
    monitoredBy: 'Dr Farhan bin Yusof, Director, Patient Safety'
  },
  {
    id: 'RR-26085',
    statement: 'Selection and dispensing errors involving look-alike sound-alike medications due to similar packaging and names, high dispensing volumes and reliance on manual picking in the inpatient pharmacy resulting in patients receiving the wrong drug or strength and consequent harm.',
    consequence: 'Patients may receive, for example, hydroxyzine instead of hydralazine or the wrong strength of methotrexate, causing hypotension, toxicity or treatment failure.',
    domain: 'Clinical',
    impact: 'Major',
    likelihood: 'Likely',
    owner: 'Dr Rachel Ong, Head, Department of Pharmacy',
    institution: 'SGH',
    department: 'Pharmacy',
    period: 'FY2026Q2',
    currentControls: [
      'Tall Man lettering for LASA pairs in the EMR and on shelf labels',
      'Physical separation of LASA products in dispensing areas',
      'Barcode verification at final check in the outpatient pharmacy'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Extend barcode scanning verification to inpatient dispensing and ward stock picking',
      'Review the LASA list quarterly using incident data and new product introductions'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-03-31',
    actionBy: 'Ms Tan Hui Min, Senior Pharmacist (Medication Safety)',
    kris: [
      { text: 'Medication dispensing errors per 10,000 items dispensed (threshold: > 0.5)', freq: 'Monthly' },
      { text: 'LASA-related near misses reported (threshold: > 15 per month)', freq: 'Monthly' }
    ],
    monitoredBy: 'Mr Daniel Koh, Manager, Quality Management'
  },
  {
    id: 'RR-26088',
    statement: 'Ransomware infection propagating through unpatchable networked medical devices and building management systems due to flat network segments, uncontrolled vendor remote-access connections and the absence of a device inventory and monitoring resulting in encryption of clinical systems, cancellation of services and diversion of ambulances.',
    consequence: 'Days to weeks of disrupted clinical operations, ambulance diversion, potential patient harm, ransom demands and large-scale data exfiltration.',
    domain: 'Information Technology',
    impact: 'Extreme',
    likelihood: 'Likely',
    owner: 'Mr Leonard Seah, Head, IT',
    institution: 'CGH',
    department: 'Information Technology',
    period: 'FY2026Q2',
    currentControls: [
      'Perimeter firewall between the hospital network and the internet',
      'Vendor remote access through a shared VPN gateway'
    ],
    currentEff: 'Minimal',
    addControls: [
      'Implement medical IoT discovery and network segmentation for 3,500 connected devices',
      'Replace vendor VPN access with privileged access management and session recording',
      'Conduct a ransomware tabletop and EMR-down exercise with clinical departments'
    ],
    addChange: 'Significant improvement',
    targetDate: '2027-04-30',
    actionBy: 'Mr Eugene Lau, Manager, Infrastructure Security',
    kris: [
      { text: '% of connected medical devices on segmented networks (target: ≥ 90%)', freq: 'Monthly' },
      { text: 'Critical medical device vulnerabilities unremediated after 90 days (threshold: > 20)', freq: 'Monthly' },
      { text: 'Vendor remote sessions without privileged access recording (target: 0)', freq: 'Monthly' }
    ],
    monitoredBy: 'Mr Raymond Chng, Chief Information Security Officer'
  },
  {
    id: 'RR-26091',
    statement: 'High burnout and attrition of intensive care nurses due to sustained high-acuity workload, frequent mandatory overtime and limited career progression resulting in unsafe nurse-to-patient ratios, ICU bed closures and loss of specialised expertise.',
    consequence: 'Closure of ICU beds, cancellation of complex elective surgery requiring post-operative ICU care and a declining pool of experienced critical care nurses.',
    domain: 'Human Capital',
    impact: 'Major',
    likelihood: 'Frequent',
    owner: 'Ms Lee Hwee Ping, Deputy Director, Nursing (Critical Care)',
    institution: 'SGH',
    department: 'Surgical & Medical Intensive Care Units',
    period: 'FY2026Q2',
    currentControls: [
      'Annual staff engagement survey with ICU-level results',
      'Overtime claims reviewed monthly by nurse managers'
    ],
    currentEff: 'Minimal',
    addControls: [
      'Introduce self-rostering with fatigue risk management limits',
      'Establish an ICU nurse wellness programme with psychologist support',
      'Create an advanced practice career track for critical care nurses'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-04-30',
    actionBy: 'Ms Revathi d/o Suppiah, Nurse Manager, Surgical ICU',
    kris: [
      { text: 'Annualised voluntary turnover of ICU nurses (threshold: > 15%)', freq: 'Monthly' },
      { text: 'Prevalence of high burnout scores among ICU nurses (threshold: > 30%)', freq: 'Half-yearly' },
      { text: 'ICU beds closed due to staffing (threshold: > 2 beds on average)', freq: 'Weekly' }
    ],
    monitoredBy: 'Ms Angela Foo, Senior Manager, Human Resource'
  },
  {
    id: 'RR-26094',
    statement: 'Prolonged waits for admitted ED patients to obtain inpatient beds due to sustained bed occupancy above 95%, delayed discharges awaiting step-down care and limited weekend discharge activity resulting in ED crowding, ambulance offload delays and adverse outcomes for patients boarded in the ED.',
    consequence: 'Elderly patients boarded on ED trolleys for over 12 hours, higher mortality and delirium, missed care and ambulance ramping.',
    domain: 'Operations',
    impact: 'Major',
    likelihood: 'Frequent',
    owner: 'Mr Kevin Yeo, Deputy Director, Operations',
    institution: 'SGH',
    department: 'Bed Management Unit',
    period: 'FY2026Q2',
    currentControls: [
      'Twice-daily hospital bed huddles',
      'Step-down transfers to community hospitals and transitional care facilities'
    ],
    currentEff: 'Minor',
    addControls: [
      'Implement predictive bed demand analytics with discharge-before-noon targets',
      'Increase weekend discharge teams and pharmacy support',
      'Expand Mobile Inpatient Care@Home capacity by 40 virtual beds'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-03-31',
    actionBy: 'Ms Ong Lay Kheng, Senior Manager, Bed Management Unit',
    kris: [
      { text: 'Median ED waiting time for admission (threshold: > 6 hours)', freq: 'Weekly' },
      { text: 'Bed occupancy rate (threshold: > 92%)', freq: 'Weekly' },
      { text: '% of discharges before 12 noon (target: ≥ 35%)', freq: 'Monthly' }
    ],
    monitoredBy: 'Dr Chua Seng Hock, Head, Emergency Medicine'
  },
  {
    id: 'RR-26096',
    statement: 'Unplanned downtime of the electronic medical record due to infrastructure failures, faulty upgrades or cyber incidents and inadequately rehearsed downtime procedures resulting in disrupted clinical documentation, ordering and medication administration and risk of patient harm.',
    consequence: 'Missed or duplicated medication doses, delayed results and loss of clinical information during and after outages across the largest hospital in the cluster.',
    domain: 'Information Technology',
    impact: 'Extreme',
    likelihood: 'Possible',
    owner: 'Ms Christina Low, Director, Clinical Systems',
    institution: 'SGH',
    department: 'Information Technology',
    period: 'FY2026Q2',
    currentControls: [
      'Active-active data centres for the EMR',
      'Read-only downtime viewer with periodic patient summary extracts',
      'Downtime procedure kits available in every ward'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Conduct twice-yearly planned downtime drills involving all wards and the ED',
      'Deploy business continuity access devices with local medication administration records'
    ],
    addChange: 'Substantial improvement',
    targetDate: '2027-02-26',
    actionBy: 'Mr Benjamin Ho, Manager, Clinical Systems (Synapxe)',
    kris: [
      { text: 'Unplanned EMR downtime (threshold: > 22 min per quarter)', freq: 'Quarterly' },
      { text: '% of wards completing a downtime drill (target: 100%)', freq: 'Half-yearly' }
    ],
    monitoredBy: 'Ms Loh Wan Ting, Manager, Business Continuity'
  },
  {
    id: 'RR-26099',
    statement: 'Sustained growth in demand for acute inpatient and specialist services from an ageing population due to the rising chronic disease burden and delays in new capacity coming on stream resulting in persistent bed shortfalls, deferred elective care and inability to meet national access targets.',
    consequence: 'Long waits for subsidised specialist appointments and elective surgery, chronic ED crowding and staff fatigue, undermining the SGH mission as the national tertiary hospital.',
    domain: 'Strategic',
    impact: 'Extreme',
    likelihood: 'Frequent',
    owner: 'Dr Yvonne Tan, Director, Strategic Planning',
    institution: 'SGH',
    department: 'Strategic Planning',
    period: 'FY2026Q2',
    currentControls: [
      'Annual capacity planning with MOH',
      'Use of transitional care facilities for patients awaiting step-down care',
      'Mobile Inpatient Care@Home programme'
    ],
    currentEff: 'Moderate',
    addControls: [
      'Update the 10-year campus master plan with phased release of bed capacity',
      'Shift 15% of stable specialist follow-ups to primary care partners under Healthier SG'
    ],
    addChange: 'Moderate improvement',
    targetDate: '2027-09-30',
    actionBy: 'Mr Gavin Lee, Senior Manager, Strategic Planning',
    kris: [
      { text: 'Average inpatient bed occupancy (threshold: > 92%)', freq: 'Monthly' },
      { text: 'Median waiting time for subsidised specialist outpatient appointments (threshold: > 30 days)', freq: 'Monthly' }
    ],
    monitoredBy: 'Mr Kevin Yeo, Deputy Director, Operations'
  }
];
