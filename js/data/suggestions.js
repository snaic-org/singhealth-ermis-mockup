/*
 * ERMIS Assist - suggestion library
 * Curated drafting suggestions for ERM review fields, organised by field
 * and by risk domain. Content reflects SingHealth enterprise risk
 * management practice and Singapore public healthcare context.
 */
window.ERMIS = window.ERMIS || {};

window.ERMIS.SUGGESTIONS = {
  general: {
    description: [
      "Opening of a new Geriatric Specialist Outpatient Medical Centre at SGH to consolidate geriatric medicine, falls clinic, memory clinic and continence services, serving an estimated 45,000 attendances annually from FY2027.",
      "Implementation of an automated outpatient pharmacy dispensing system at CGH, comprising robotic storage, automated packing and an integrated queue management system, to reduce waiting times and dispensing errors.",
      "Commissioning of a new Day Surgery Centre at SKH with six operating theatres, a pre-admission assessment clinic and a 24-bay recovery area, targeted to handle 60% of elective surgical cases on a same-day basis.",
      "Cluster-wide rollout of the Next Generation Electronic Medical Record (NGEMR) closed-loop medication management module across SingHealth acute hospitals, delivered jointly with Synapxe over three phased go-lives.",
      "Five-year Nursing Workforce Plan for SingHealth institutions addressing recruitment, retention, advanced practice nurse development and the integration of foreign-trained nurses to meet projected bed growth.",
      "Establishment of a centralised research biobank at the Academia to collect, process and store human biological specimens and associated clinical data for approved research, in compliance with the Human Biomedical Research Act.",
      "Community Care Transition Programme linking SGH, Outram Community Hospital and SingHealth Polyclinics to support safe discharge of frail elderly patients, with post-discharge calls, home visits and Healthier SG enrolment.",
      "Phased renovation of three general medical wards at CGH, including conversion to single-room isolation capacity and upgrading of nurse call and bed-exit alarm systems, while maintaining operational bed capacity throughout works."
    ],
    vision: [
      "To assure medication safety through the prescription, dispensing and administration of the right drug in the right dosage to the right patient at the right time via the right route.",
      "To deliver safe, timely and person-centred care for older adults through an integrated, multidisciplinary geriatric service that keeps patients well in the community.",
      "To be a high-reliability organisation in which zero preventable harm to patients and staff is the expected standard of care.",
      "To build a future-ready, engaged and resilient workforce that sustains excellence in patient care, education and research across SingHealth.",
      "To safeguard the confidentiality, integrity and availability of patient information while enabling seamless, digitally enabled care across the cluster.",
      "To advance population health under Healthier SG by strengthening seamless care transitions between hospitals, community partners and primary care."
    ],
    objective: [
      "To ensure the contractor completes the installation of hand-bars along all corridors in the campus within 18 months.",
      "To dispense the right medication to the right patient each and every time.",
      "To reduce inpatient falls with injury to below 0.3 per 1,000 patient-days by the end of FY2027.",
      "To achieve 100% compliance with two-identifier patient identification before medication administration across all inpatient wards within 12 months.",
      "To reduce average outpatient pharmacy waiting time from 35 minutes to under 20 minutes within six months of automation go-live.",
      "To achieve at least 95% completion of mandatory annual training (including Basic Cardiac Life Support and PDPA) for all clinical staff by 31 March each year.",
      "To reduce 30-day unplanned readmissions among frail elderly patients enrolled in the transition programme by 15% within two years.",
      "To attain hand hygiene compliance of at least 90% across all clinical areas, as measured by quarterly direct observation audits, by December 2027.",
      "To commission the Day Surgery Centre on schedule and within the approved budget, with all six theatres operational by Q3 FY2027.",
      "To close all high-risk internal audit findings within 90 days of the final audit report being issued.",
      "To reduce registered nurse turnover from 12% to below 9% annually within three years through structured retention and career development initiatives.",
      "To ensure all mission-critical clinical systems have a tested disaster recovery plan with a recovery time objective of four hours or less by end of FY2026."
    ],
    riskStatement: [
      "Delay in project completion due to contractor resource constraints and late design changes resulting in deferred service commencement and increased project cost.",
      "Disruption to patient services due to inadequate change management during system go-live resulting in treatment delays and patient dissatisfaction.",
      "Non-compliance with HCSA licensing conditions due to unclear ownership of regulatory requirements resulting in MOH enforcement action and reputational damage.",
      "Unauthorised disclosure of patient data due to weak access controls and staff unawareness of PDPA obligations resulting in regulatory penalties and loss of public trust.",
      "Inability to sustain service levels due to shortage of trained staff resulting in longer waiting times and increased staff burnout.",
      "Cost overrun on capital project due to inaccurate initial estimates and rising construction prices resulting in budget shortfall and deferral of other priority projects."
    ],
    consequence: [
      "Patient harm requiring additional treatment and prolonged length of stay, with mandatory reporting to MOH and potential medico-legal claims.",
      "Interruption to clinical services leading to cancelled appointments, longer waiting times and diversion of patients to other institutions.",
      "Financial loss arising from remediation costs, penalties and unrecovered revenue, adversely affecting the institution's operating budget.",
      "Adverse media coverage and public complaints eroding confidence in the institution and the SingHealth brand.",
      "Regulatory findings or licensing conditions imposed by MOH, requiring formal corrective action plans and increased oversight."
    ],
    currentControls: [
      "Institutional policies and standard operating procedures reviewed every two years and approved by the relevant committee.",
      "Mandatory staff training with annual competency assessment, tracked through the learning management system.",
      "Regular internal audits with findings reported to the Audit and Risk Committee and tracked to closure.",
      "Project steering committee with monthly progress, budget and risk reviews.",
      "Incident reporting through the Risk Management Information System with root cause analysis for serious reportable events.",
      "Role-based access controls on clinical and corporate systems with periodic user access reviews."
    ],
    additionalControls: [
      "Develop a dashboard of key risk indicators for monthly review by the department head and quarterly reporting to the Risk Committee.",
      "Conduct a tabletop exercise to test the business continuity plan for the service before go-live.",
      "Introduce e-learning refresher modules with mandatory post-test for all staff within the first month of deployment.",
      "Engage an independent reviewer to perform a post-implementation review six months after commencement.",
      "Establish a structured lessons-learnt process to share incidents and near misses across SingHealth institutions.",
      "Automate compliance monitoring through system-generated exception reports reviewed weekly by process owners."
    ],
    kri: [
      "No./percentage of staff trained (Target: 100% of new hires)",
      "No. of near misses (e.g. med errors) (Target: 0)",
      "No. of adverse events (e.g. patient falls) (Target: 0)",
      "Customer Satisfaction Index (Target: at least 90%)",
      "Number of unaddressed audit findings beyond agreed due date (Threshold: > 2)",
      "% of project milestones delayed by more than 30 days (Threshold: > 10%)",
      "% of mandatory training completion (Target: ≥ 95%)",
      "% of policies overdue for review (Threshold: > 5%)"
    ]
  },

  byDomain: {
    'Strategic': {
      riskStatement: [
        "Failure to achieve Healthier SG enrolment targets due to limited primary care capacity and low resident engagement resulting in reduced capitation funding and unmet population health goals.",
        "Misalignment of institutional priorities with cluster strategy due to fragmented planning processes resulting in duplicated investments and suboptimal use of resources.",
        "Delay in opening of new healthcare facility due to construction delays and late equipment procurement resulting in unmet service demand and increased bed crunch.",
        "Inability to meet rising demand from an ageing population due to insufficient long-range capacity planning resulting in prolonged waiting times and overcrowding at Emergency Departments.",
        "Failure of strategic partnership with community care providers due to unclear roles and misaligned incentives resulting in poor care transitions and higher readmission rates.",
        "Loss of competitiveness in attracting clinical talent and research funding due to slow adoption of new care models resulting in diminished academic medicine standing.",
        "Ineffective execution of transformation initiatives due to change fatigue and weak programme governance resulting in benefits not being realised.",
        "Disruption to long-term plans due to sudden changes in national healthcare policy or financing frameworks resulting in need to reprioritise projects at short notice."
      ],
      consequence: [
        "Strategic objectives in the institution's workplan are not met, affecting performance scorecards reported to MOH and the SingHealth Board.",
        "Persistent capacity shortfall leading to high bed occupancy, long Emergency Department boarding times and deferred elective procedures.",
        "Reduced government funding or capitation payments due to underachievement of national programme targets.",
        "Wasted investment in projects that do not deliver intended outcomes, with opportunity cost to other priority initiatives.",
        "Erosion of SingHealth's standing as a leading Academic Medical Centre, affecting partnerships, philanthropy and talent attraction.",
        "Loss of stakeholder confidence, including from MOH, community partners and the public, in the institution's ability to deliver on its mission."
      ],
      currentControls: [
        "Annual institutional workplan aligned to SingHealth and MOH strategic priorities, endorsed by the Board.",
        "Quarterly balanced scorecard reviews by senior management with variance analysis.",
        "Programme Management Office overseeing major transformation projects with stage-gate approvals.",
        "Regional Health System planning committee coordinating services with community and primary care partners.",
        "Long-range capacity planning model reviewed annually against demographic projections.",
        "Memoranda of understanding defining roles with community hospitals, nursing homes and GP partners.",
        "Strategic risk register reviewed by the Risk Committee twice yearly.",
        "Regular engagement sessions with MOH policy divisions on upcoming policy changes."
      ],
      additionalControls: [
        "Implement scenario planning workshops to test strategic plans against alternative policy and demand scenarios.",
        "Introduce benefits realisation tracking for all transformation projects above S$5 million.",
        "Establish a joint Healthier SG outreach taskforce with SingHealth Polyclinics and partner GPs.",
        "Develop a cluster-wide change management framework with change champions in each institution.",
        "Commission an independent mid-term review of the institutional strategic plan.",
        "Integrate strategic risk appetite statements into the annual budgeting and workplan process.",
        "Set up a horizon scanning function to monitor emerging healthcare trends and policy signals."
      ],
      kri: [
        "% of strategic workplan milestones achieved on schedule (Target: ≥ 85%)",
        "Healthier SG enrolment against annual target (Threshold: < 80% of target)",
        "Average bed occupancy rate (Threshold: > 90% for 3 consecutive months)",
        "Emergency Department median waiting time to admission (Threshold: > 6 hours)",
        "% of transformation projects with benefits realised as planned (Target: ≥ 75%)",
        "30-day unplanned readmission rate (Threshold: > 12%)",
        "Number of major capital projects delayed by more than 6 months (Threshold: > 1)"
      ]
    },

    'Clinical': {
      riskStatement: [
        "Dispensing the wrong medication due to not verifying patient identity resulting in patient harm.",
        "Administering wrong dose medication due to inadequate communication during shift change resulting in adverse drug reaction in patient.",
        "Inpatient fall due to inadequate falls risk assessment and unsupervised mobilisation of high-risk patients resulting in fractures, head injury and prolonged length of stay.",
        "Selection error involving look-alike sound-alike (LASA) medications due to similar packaging and adjacent storage resulting in wrong drug being administered.",
        "Mis-administration of high-alert medications such as insulin, heparin or potassium chloride due to lack of independent double-checks resulting in severe patient harm or death.",
        "Delayed recognition of sepsis due to non-adherence to sepsis screening protocols resulting in delayed antibiotic therapy, ICU admission and increased mortality.",
        "Failure to escalate a deteriorating patient due to incomplete vital signs monitoring and unclear escalation pathways resulting in unplanned ICU transfer or cardiac arrest.",
        "Wrong-site, wrong-procedure or wrong-patient surgery due to incomplete surgical safety checklist and site marking resulting in serious patient harm and a Serious Reportable Event.",
        "Healthcare-associated infection due to poor hand hygiene compliance and lapses in isolation precautions resulting in prolonged length of stay and spread of multidrug-resistant organisms.",
        "Transfusion of incompatible blood products due to errors in specimen labelling or bedside verification resulting in acute haemolytic transfusion reaction.",
        "Hospital-acquired pressure injury due to inadequate repositioning and skin assessment of immobile patients resulting in pain, infection and extended hospitalisation.",
        "Missed follow-up of abnormal test results due to absence of a closed-loop results acknowledgement process resulting in delayed diagnosis and disease progression.",
        "Incomplete discharge medication reconciliation due to poor handover between inpatient and primary care teams resulting in medication errors and avoidable readmission.",
        "Paediatric dosing error due to incorrect weight-based calculation and decimal point errors resulting in overdose or underdose in a child."
      ],
      consequence: [
        "Temporary or permanent harm to the patient requiring additional intervention, prolonged length of stay or transfer to a higher level of care.",
        "Patient death or serious injury classified as a Serious Reportable Event, requiring notification to MOH and root cause analysis.",
        "Medico-legal claims and compensation payments, with potential referral of involved practitioners to the Singapore Medical Council or Singapore Nursing Board.",
        "Increased healthcare costs from extended admission, additional investigations and treatment of complications.",
        "Loss of patient and family trust, formal complaints and adverse media or social media attention.",
        "Adverse findings during JCI accreditation or MOH licensing inspection, affecting accreditation status."
      ],
      currentControls: [
        "Two-identifier patient identification policy applied before medication administration, procedures and specimen collection.",
        "Structured ISBAR handover protocol at shift change and inter-ward transfers.",
        "Morse Fall Scale assessment on admission and daily, with bed-exit alarms and falls precaution signage for high-risk patients.",
        "Independent double-check for high-alert medications documented in the electronic medication administration record.",
        "LASA medication list with tall-man lettering and segregated storage in pharmacy and ward stock.",
        "National Early Warning Score (NEWS) with mandatory escalation to the Rapid Response Team at defined thresholds.",
        "WHO Surgical Safety Checklist with sign-in, time-out and sign-out completed for every procedure.",
        "Hand hygiene audits conducted monthly by Infection Prevention and Epidemiology with feedback to ward managers."
      ],
      additionalControls: [
        "Implement barcode medication administration (BCMA) at bedside for all inpatient wards.",
        "Introduce smart infusion pumps with dose error reduction software for high-alert infusions.",
        "Deploy an electronic sepsis alert in the EMR that triggers on combined vital signs and laboratory criteria.",
        "Implement closed-loop electronic acknowledgement of critical and abnormal results with automatic escalation if unacknowledged within 24 hours.",
        "Introduce pharmacist-led medication reconciliation at discharge for patients on five or more medications.",
        "Pilot AI-assisted falls risk prediction using EMR data and bed sensor monitoring in geriatric wards.",
        "Standardise weight-based paediatric dosing using EMR dose calculators and pre-filled oral syringes at KKH."
      ],
      kri: [
        "Patient falls with injury per 1,000 patient-days (Threshold: > 0.3)",
        "% of medication errors per 1000 prescriptions (Threshold: > 0.5%)",
        "Hospital Acquired Infection (HAI) Rate per 1,000 patient-days (Threshold: > 2.0)",
        "Hand hygiene compliance rate (Target: ≥ 90%)",
        "Number of Serious Reportable Events per quarter (Target: 0)",
        "Hospital-acquired pressure injury stage 2 and above per 1,000 patient-days (Threshold: > 0.5)",
        "% of sepsis patients receiving antibiotics within 1 hour of recognition (Target: ≥ 90%)"
      ]
    },

    'Education': {
      riskStatement: [
        "Inadequate clinical supervision of junior doctors due to high service workload of supervising consultants resulting in patient safety incidents and poor training outcomes.",
        "Loss of residency programme accreditation due to non-compliance with ACGME-I or national training standards resulting in inability to train residents and reputational damage.",
        "Insufficient clinical placements for nursing and allied health students due to competing service demands resulting in reduced talent pipeline for SingHealth.",
        "Poor quality of education delivery due to lack of faculty development and protected teaching time resulting in lower trainee satisfaction and examination pass rates.",
        "Trainee burnout and attrition due to excessive duty hours and inadequate wellbeing support resulting in loss of future workforce.",
        "Non-completion of mandatory competency training due to scheduling conflicts and roster constraints resulting in staff practising without validated skills.",
        "Breach of patient privacy during teaching activities due to inappropriate use of identifiable patient images or data resulting in PDPA complaints and disciplinary action.",
        "Ineffective simulation training due to outdated equipment and limited access to simulation facilities resulting in reduced preparedness for clinical emergencies."
      ],
      consequence: [
        "Reduced competency of the future clinical workforce, potentially affecting patient safety and care quality.",
        "Withdrawal or suspension of programme accreditation, requiring trainees to be redeployed to other sponsoring institutions.",
        "Lower recruitment and retention of trainees, increasing reliance on locum and contract staff.",
        "Complaints from trainees or educational partners such as Duke-NUS, NUS and SIT, damaging institutional reputation as a teaching hospital.",
        "Regulatory or disciplinary action arising from privacy breaches in educational settings.",
        "Increased staff stress and sick leave affecting service delivery and morale."
      ],
      currentControls: [
        "Residency programme governance under the SingHealth Graduate Medical Education Office with annual programme evaluations.",
        "Duty hour monitoring for residents with escalation when limits are exceeded.",
        "Faculty development programmes and teaching awards to recognise clinical educators.",
        "Learning management system tracking completion of mandatory and competency-based training.",
        "Clinical placement agreements with partner institutions specifying student numbers and supervision ratios.",
        "Trainee wellbeing programme including peer support and access to the staff counselling service.",
        "Guidelines on consent and de-identification for use of patient information in teaching materials.",
        "Simulation-based training at the SingHealth Duke-NUS Institute of Medical Simulation."
      ],
      additionalControls: [
        "Introduce protected teaching time for core faculty in the departmental rostering system.",
        "Implement a trainee early-warning dashboard combining duty hours, assessment results and wellbeing survey data.",
        "Develop a cluster-wide clinical placement scheduling platform shared with academic partners.",
        "Mandate annual PDPA and patient confidentiality refresher training for all educators and trainees.",
        "Expand in-situ simulation drills for deteriorating patient scenarios in all wards.",
        "Establish mentorship pairing for all first-year residents and new graduate nurses.",
        "Refresh simulation equipment under a five-year replacement plan."
      ],
      kri: [
        "% of residents exceeding duty hour limits per month (Threshold: > 5%)",
        "Residency programme board examination pass rate (Target: ≥ 90%)",
        "% of staff with current Basic Cardiac Life Support certification (Target: ≥ 98%)",
        "Trainee attrition rate per academic year (Threshold: > 8%)",
        "Number of outstanding accreditation citations (Threshold: > 0 beyond due date)",
        "Trainee satisfaction score on annual survey (Target: ≥ 4.0 out of 5)",
        "% of clinical educators who completed faculty development in past 2 years (Target: ≥ 80%)"
      ]
    },

    'Research': {
      riskStatement: [
        "Research conducted without valid ethics approval due to lapses in protocol amendment submission to the SingHealth Centralised Institutional Review Board resulting in regulatory breach and suspension of the study.",
        "Non-compliance with informed consent requirements due to inadequate training of study coordinators resulting in invalid consent and harm to research participants.",
        "Unreported serious adverse events in clinical trials due to delayed safety reporting by investigators resulting in non-compliance with HSA requirements and participant harm.",
        "Unauthorised disclosure of research data due to insecure data transfer to external collaborators resulting in PDPA breach and loss of participant trust.",
        "Research misconduct including data fabrication or plagiarism due to weak research integrity oversight resulting in retraction of publications and reputational damage.",
        "Loss or degradation of biobank specimens due to freezer failure and absence of temperature alarm monitoring resulting in loss of irreplaceable research material.",
        "Mismanagement of research grant funds due to inadequate financial oversight by principal investigators resulting in clawback by funding agencies and audit findings.",
        "Failure to meet clinical trial recruitment targets due to unrealistic feasibility assessment resulting in early termination and loss of sponsor confidence."
      ],
      consequence: [
        "Harm to research participants and potential compensation claims under clinical trial insurance.",
        "Suspension of studies or investigators by the CIRB, HSA or MOH under the Human Biomedical Research Act.",
        "Clawback of grant funding by NMRC or industry sponsors and ineligibility for future grants.",
        "Retraction of publications and damage to the academic reputation of investigators and the institution.",
        "Loss of valuable research specimens and data, setting back research programmes by years.",
        "Regulatory penalties under PDPA and HBRA for mishandling of personal or biomedical research data."
      ],
      currentControls: [
        "All human biomedical research reviewed and approved by the SingHealth Centralised Institutional Review Board (CIRB) before commencement.",
        "Good Clinical Practice (GCP) certification required for all investigators and study coordinators.",
        "Serious adverse event reporting SOP aligned with HSA clinical trial regulations.",
        "Research data management policy requiring de-identification and approved data transfer agreements.",
        "Research integrity office handling allegations of misconduct with a defined investigation framework.",
        "Biobank freezers on uninterruptible power supply with daily temperature logs.",
        "Grant finance office reviewing expenditure against approved budgets quarterly.",
        "Clinical trial feasibility assessment by the Clinical Trials Office before acceptance of industry studies."
      ],
      additionalControls: [
        "Implement an electronic research administration system integrating CIRB approvals, grants and contracts.",
        "Introduce risk-based monitoring and periodic for-cause audits of investigator-initiated trials.",
        "Deploy 24/7 remote temperature monitoring with SMS alerts for all biobank freezers.",
        "Establish a secure trusted research environment for analysis of identifiable data instead of external transfers.",
        "Mandate annual research integrity training for all principal investigators.",
        "Introduce automated reminders for upcoming CIRB approval expiry and continuing review deadlines.",
        "Develop recruitment dashboards for active trials with escalation when enrolment falls below plan."
      ],
      kri: [
        "Number of studies conducted with lapsed CIRB approval (Target: 0)",
        "% of serious adverse events reported within regulatory timelines (Target: 100%)",
        "Number of protocol deviations involving informed consent per quarter (Threshold: > 2)",
        "Biobank freezer temperature excursions per month (Threshold: > 1)",
        "% of grant expenditure flagged as ineligible in audit (Threshold: > 2%)",
        "% of clinical trials meeting recruitment targets (Target: ≥ 70%)",
        "Number of research data transfers without approved agreement (Target: 0)"
      ]
    },

    'Human Capital': {
      riskStatement: [
        "Shortage of registered nurses due to high attrition and competition from overseas healthcare employers resulting in increased workload, bed closures and compromised patient care.",
        "Staff burnout due to sustained high workload and excessive overtime resulting in increased sick leave, errors and resignations.",
        "Loss of key clinical and management personnel due to inadequate succession planning resulting in service disruption and loss of institutional knowledge.",
        "Workplace violence and harassment against staff due to inadequate security measures and reporting culture resulting in staff injury and psychological distress.",
        "Practising without valid professional registration due to lapses in credentialing and licence renewal tracking resulting in regulatory breach and invalid care.",
        "Low staff engagement due to limited career progression and recognition resulting in reduced productivity and higher turnover.",
        "Ineffective integration of foreign-trained healthcare workers due to insufficient orientation and cultural adaptation support resulting in early resignation and practice gaps.",
        "Industrial relations disputes due to poor communication of changes in employment terms resulting in disruption to services and negative publicity."
      ],
      consequence: [
        "Reduced operational capacity leading to bed closures, longer waiting times and deferred services.",
        "Increased reliance on agency and overtime staffing, raising manpower costs above budget.",
        "Higher incidence of errors and patient safety events attributable to fatigue and understaffing.",
        "Staff injury, psychological harm and potential claims under the Work Injury Compensation Act.",
        "Regulatory action by the Singapore Medical Council, Singapore Nursing Board or Allied Health Professions Council for credentialing lapses.",
        "Damage to SingHealth's reputation as an employer of choice, affecting future recruitment."
      ],
      currentControls: [
        "Annual manpower planning aligned with service growth projections and MOH workforce guidelines.",
        "Overtime monitoring and approval workflow with monthly reports to department heads.",
        "Succession planning framework for key leadership and specialist roles.",
        "Zero-tolerance policy on abuse and harassment of healthcare workers, with security escalation procedures.",
        "Credentialing and privileging committee with automated alerts for professional licence expiry.",
        "Employee engagement survey conducted every two years with departmental action plans.",
        "Structured orientation programme for foreign-trained nurses including clinical preceptorship.",
        "Staff wellbeing programme and employee assistance programme with confidential counselling."
      ],
      additionalControls: [
        "Implement a predictive attrition model using HR analytics to identify at-risk staff for early intervention.",
        "Introduce flexible rostering and part-time career tracks to retain experienced nurses.",
        "Install duress alarms and enhance security presence in Emergency Departments and high-risk clinics.",
        "Develop talent pools with individual development plans for all critical positions.",
        "Establish a structured buddy system and community integration programme for foreign-trained staff.",
        "Introduce fatigue risk management guidelines limiting consecutive night shifts and extended duty hours.",
        "Conduct pulse surveys quarterly to track engagement between full engagement surveys."
      ],
      kri: [
        "Staff turnover rate (annualised) (Threshold: > 10%)",
        "% of overtime hours logged per department over 30-day average (Threshold: > 15%)",
        "Nursing vacancy rate (Threshold: > 8%)",
        "Number of workplace violence incidents against staff per month (Threshold: > 5)",
        "% of critical positions with ready-now successor identified (Target: ≥ 70%)",
        "Number of staff practising with expired professional registration (Target: 0)",
        "Employee engagement index (Target: ≥ 70%)"
      ]
    },

    'Financial': {
      riskStatement: [
        "Revenue leakage due to inaccurate charge capture and coding errors in the billing system resulting in financial loss and audit findings.",
        "Increase in bad debts due to ineffective collection processes and patients' inability to pay resulting in reduced cash flow and write-offs.",
        "Rejection of MediSave and MediShield Life claims due to incomplete documentation and incorrect claim submission resulting in delayed reimbursement and revenue loss.",
        "Budget overrun due to rising manpower, drug and consumables costs exceeding planned levels resulting in operating deficit.",
        "Procurement fraud due to inadequate segregation of duties and weak vendor due diligence resulting in financial loss and reputational damage.",
        "Insufficient liquidity due to delays in government subvention disbursement and capital commitments resulting in inability to meet short-term obligations.",
        "Non-compliance with government procurement and financial regulations due to staff unfamiliarity with procedures resulting in adverse audit findings by the Auditor-General's Office.",
        "Foreign exchange and supply price volatility due to reliance on imported medical supplies and equipment resulting in unbudgeted cost increases."
      ],
      consequence: [
        "Operating deficit requiring reallocation of funds from planned initiatives or additional funding from MOH.",
        "Delayed payments to suppliers and strained vendor relationships.",
        "Write-off of receivables and reduced funds available for patient care and capital investment.",
        "Adverse findings in internal or external audit reports, requiring remediation and Board reporting.",
        "Financial loss from fraud or misappropriation, with potential police investigation and disciplinary action.",
        "Reduced financial sustainability affecting the institution's ability to invest in new services and technology."
      ],
      currentControls: [
        "Annual budgeting process with monthly variance reporting to department heads and finance committee.",
        "Charge capture audits and clinical coding reviews by Health Information Management.",
        "Pre-submission validation of MediSave and MediShield Life claims through the claims management system.",
        "Delegation of authority matrix and segregation of duties for procurement and payment approvals.",
        "Vendor registration and due diligence process including conflict-of-interest declarations.",
        "Cash flow forecasting reviewed monthly by the Finance department.",
        "Credit control and debt collection procedures with financial counselling for patients via Medical Social Workers.",
        "Internal audit of high-value procurement and payment processes annually."
      ],
      additionalControls: [
        "Implement automated charge capture integrated with the EMR to reduce manual billing errors.",
        "Deploy data analytics to detect anomalous procurement and payment patterns for fraud prevention.",
        "Introduce pre-admission financial counselling and payment plans for high-cost procedures.",
        "Establish a claims denial management team to analyse rejection trends and retrain staff.",
        "Implement group purchasing and long-term contracts to hedge against supply price volatility.",
        "Conduct quarterly fraud risk assessment workshops with procurement and finance staff.",
        "Introduce rolling 12-month financial forecasts to replace static annual budgets."
      ],
      kri: [
        "Days of cash on hand (Threshold: < 60 days)",
        "Claim denial rate (Threshold: > 3%)",
        "Budget variance for operating expenditure (Threshold: > 5% over budget)",
        "Debtor days outstanding (Threshold: > 45 days)",
        "Bad debt write-off as % of patient revenue (Threshold: > 1.5%)",
        "Number of procurement non-compliance findings per audit (Threshold: > 3)",
        "% of charges captured after discharge billing cut-off (Threshold: > 2%)"
      ]
    },

    'Operations': {
      riskStatement: [
        "Prolonged Emergency Department waiting times due to inadequate bed availability and delays in inpatient discharge resulting in patient deterioration and dissatisfaction.",
        "Surgical cancellations on the day of surgery due to incomplete pre-operative assessment and theatre scheduling conflicts resulting in wasted theatre time and patient distress.",
        "Disruption to supply of critical medical consumables due to single-source supplier dependency and global supply chain disruption resulting in deferral of procedures.",
        "Failure of business continuity during a public health emergency due to untested contingency plans resulting in inability to maintain essential services at elevated DORSCON levels.",
        "Delays in patient transport between facilities due to insufficient ambulance and porter capacity resulting in missed appointments and delayed treatment.",
        "Breakdown of critical medical equipment due to inadequate preventive maintenance resulting in service disruption and patient harm.",
        "Poor outsourced service performance due to weak contract management and monitoring resulting in lapses in cleanliness, catering or security standards.",
        "Long specialist outpatient appointment waiting times due to demand exceeding clinic capacity resulting in delayed diagnosis and patient complaints."
      ],
      consequence: [
        "Delayed treatment leading to deterioration in patient condition and potential harm.",
        "Reduced throughput and inefficient use of theatres, beds and clinic resources.",
        "Increased patient complaints and lower patient satisfaction scores.",
        "Inability to provide essential services during a crisis, with escalation to MOH and diversion of patients.",
        "Additional costs from emergency procurement, overtime and contractor penalties.",
        "Non-compliance with HCSA service requirements and MOH key performance indicators."
      ],
      currentControls: [
        "Bed management unit with daily bed huddles and discharge planning rounds.",
        "Pre-operative assessment clinic and theatre scheduling system with list confirmation 48 hours ahead.",
        "Minimum stockholding levels for critical consumables managed with ALPS Healthcare.",
        "Business continuity plans for critical services tested annually through drills.",
        "Planned preventive maintenance schedule for biomedical equipment tracked in the asset management system.",
        "Key performance indicators in outsourced service contracts with monthly performance reviews.",
        "Specialist outpatient clinic appointment system with triage of new referrals by urgency.",
        "Pandemic preparedness plan aligned with DORSCON framework and MOH directives."
      ],
      additionalControls: [
        "Implement a real-time command centre dashboard for patient flow across ED, wards and discharge.",
        "Introduce predictive discharge planning with estimated date of discharge set within 24 hours of admission.",
        "Qualify alternative suppliers for single-source critical consumables.",
        "Conduct full-scale business continuity exercises including loss of utilities and mass casualty scenarios.",
        "Deploy IoT-based equipment monitoring for predictive maintenance of high-value medical devices.",
        "Expand tele-consultation and nurse-led clinics to increase outpatient capacity.",
        "Introduce automated SMS reminders and online rescheduling to reduce clinic no-show rates."
      ],
      kri: [
        "Surgical cancellation within 24 hours (Threshold: > 5% of scheduled cases)",
        "Emergency Department median time to ward admission (Threshold: > 6 hours)",
        "Median waiting time for new specialist outpatient appointment (Threshold: > 40 days)",
        "% of critical consumables below minimum stock level (Threshold: > 2%)",
        "% of preventive maintenance completed on schedule (Target: ≥ 95%)",
        "Outpatient appointment no-show rate (Threshold: > 15%)",
        "Number of outsourced service KPI breaches per month (Threshold: > 3)"
      ]
    },

    'Information Technology': {
      riskStatement: [
        "Cyberattack such as ransomware on hospital systems due to unpatched vulnerabilities and phishing susceptibility resulting in disruption of clinical services and data loss.",
        "Unauthorised access to patient medical records due to shared login credentials and excessive access rights resulting in PDPA breach and loss of patient trust.",
        "Prolonged downtime of the electronic medical record due to infrastructure failure and inadequate redundancy resulting in delayed care and medication errors.",
        "Data loss due to failed or untested backups resulting in inability to restore critical clinical and corporate systems.",
        "Data leakage via third-party vendors due to inadequate vendor security assessments resulting in exposure of sensitive patient information.",
        "Failure of system implementation due to poor requirements gathering and inadequate user testing resulting in workflow disruption and low user adoption.",
        "Use of unapproved software and shadow IT due to lack of awareness of IT policies resulting in security vulnerabilities and non-compliance with government ICT policies.",
        "Loss of data integrity due to interface errors between clinical systems resulting in inaccurate patient records and clinical decision errors."
      ],
      consequence: [
        "Disruption to clinical and operational services, requiring activation of downtime procedures and possible diversion of patients.",
        "Exposure of patient data leading to PDPA penalties, MOH directives and mandatory notification to affected individuals.",
        "Loss of public trust in SingHealth's ability to protect personal health information.",
        "Significant recovery costs including forensic investigation, system restoration and remediation.",
        "Clinical errors arising from unavailable or inaccurate patient information.",
        "Parliamentary questions and national-level scrutiny of healthcare cybersecurity."
      ],
      currentControls: [
        "Cybersecurity measures managed by Synapxe including firewalls, endpoint detection and 24/7 security operations centre monitoring.",
        "Internet surfing separation for clinical workstations accessing patient data.",
        "Role-based access control with quarterly user access reviews by system owners.",
        "Audit trail monitoring for access to VIP and staff medical records.",
        "Regular data backup with offsite storage for mission-critical systems.",
        "Annual phishing simulation exercises and mandatory cybersecurity awareness training.",
        "Downtime procedures and paper-based contingency forms for EMR outages.",
        "Vendor security assessment as part of IT procurement under Healthcare Cybersecurity Essentials."
      ],
      additionalControls: [
        "Implement multi-factor authentication for all remote and privileged access.",
        "Deploy user behaviour analytics to detect anomalous access to patient records in real time.",
        "Conduct annual disaster recovery failover tests for all mission-critical systems.",
        "Introduce privileged access management with session recording for system administrators.",
        "Implement data loss prevention tools on email and endpoints to block unauthorised transfer of patient data.",
        "Automate deprovisioning of access upon staff resignation or transfer through HR system integration.",
        "Establish a cyber incident response playbook jointly exercised with Synapxe and the Cyber Security Agency."
      ],
      kri: [
        "Unplanned downtime of mission-critical systems per quarter (Threshold: > 22 minutes)",
        "Number of patient records accessed without valid reason (Target: 0)",
        "% of expired access credentials not deactivated (Threshold: > 1%)",
        "% of critical systems without backup or recovery plan (Target: 0%)",
        "% of critical security patches applied within 30 days (Target: ≥ 95%)",
        "Phishing simulation click rate (Threshold: > 5%)",
        "Number of high-severity cybersecurity incidents per quarter (Target: 0)"
      ]
    },

    'Technology': {
      riskStatement: [
        "Malfunction of medical devices due to software defects or inadequate acceptance testing resulting in incorrect diagnosis or therapy delivery.",
        "Unsafe use of artificial intelligence clinical decision support tools due to lack of validation in the local patient population resulting in biased or inaccurate recommendations.",
        "Obsolescence of critical medical equipment due to delayed replacement planning resulting in increased breakdowns and unavailability of vendor support.",
        "Failure of robotic or automated systems such as pharmacy robots or pneumatic tube systems due to single points of failure resulting in service disruption.",
        "Incorrect use of new medical technology due to insufficient user training and competency assessment resulting in patient harm.",
        "Cybersecurity vulnerabilities in connected medical devices due to legacy operating systems resulting in device compromise and patient safety risk.",
        "Non-compliance with HSA medical device regulations due to use of unregistered devices or unreported field safety notices resulting in regulatory action.",
        "Poor return on technology investment due to inadequate health technology assessment before procurement resulting in underutilised equipment."
      ],
      consequence: [
        "Patient harm from device malfunction or incorrect technology-assisted decisions.",
        "Disruption to diagnostic and therapeutic services while devices are out of service.",
        "Regulatory action by HSA and mandatory adverse event reporting.",
        "Increased costs from emergency replacement, repairs and extended downtime.",
        "Wasted capital investment and opportunity cost of underutilised equipment.",
        "Reputational damage if technology failures attract public or media attention."
      ],
      currentControls: [
        "Biomedical engineering acceptance testing and commissioning of all new medical devices.",
        "Medical equipment replacement plan based on age, condition and criticality.",
        "Health technology assessment by the Medical Technology Committee before major procurements.",
        "Vendor-provided user training with competency sign-off for new equipment.",
        "Monitoring of HSA field safety notices and device recalls by Biomedical Engineering.",
        "Planned preventive maintenance contracts for critical medical equipment.",
        "Segregated network for medical devices with restricted connectivity.",
        "Manual contingency procedures for failure of pharmacy automation and pneumatic tube systems."
      ],
      additionalControls: [
        "Establish an AI governance framework requiring local validation, bias assessment and ongoing performance monitoring of clinical AI tools.",
        "Implement a medical device cybersecurity risk assessment for all networked devices before deployment.",
        "Introduce lifecycle cost modelling for capital equipment replacement decisions.",
        "Build redundancy for critical automation systems with dual units or manual fallback stations.",
        "Develop super-user programmes for new technology to provide on-the-floor support after go-live.",
        "Conduct post-implementation utilisation reviews for equipment above S$500,000.",
        "Maintain a central register of all AI and algorithm-based tools used in clinical care."
      ],
      kri: [
        "% of critical medical equipment beyond recommended lifespan (Threshold: > 10%)",
        "Number of device-related adverse events reported to HSA per quarter (Threshold: > 1)",
        "Medical equipment uptime for critical devices (Target: ≥ 98%)",
        "% of field safety notices actioned within 14 days (Target: 100%)",
        "% of clinical AI tools with completed local validation (Target: 100%)",
        "Number of networked medical devices on unsupported operating systems (Threshold: > 5)",
        "Utilisation rate of high-value equipment against business case (Threshold: < 70%)"
      ]
    },

    'Hazard': {
      riskStatement: [
        "Fire outbreak in clinical areas due to faulty electrical equipment and improper storage of flammable materials resulting in injury, evacuation and loss of facilities.",
        "Slips, trips and falls of staff and visitors due to wet floors and uneven surfaces resulting in injury and work injury compensation claims.",
        "Needlestick and sharps injuries to staff due to unsafe disposal practices and recapping of needles resulting in risk of bloodborne virus transmission.",
        "Exposure to hazardous chemicals such as cytotoxic drugs and disinfectants due to inadequate personal protective equipment and spill management resulting in staff illness.",
        "Spread of infectious disease outbreak within the hospital due to delayed detection and inadequate isolation capacity resulting in staff and patient infections and service disruption.",
        "Failure of critical utilities such as power, water or medical gas due to aging infrastructure resulting in disruption to life-support systems and patient harm.",
        "Radiation overexposure of staff and patients due to non-adherence to radiation safety protocols resulting in health effects and non-compliance with NEA requirements.",
        "Manual handling injuries to staff due to inadequate patient lifting equipment and training resulting in musculoskeletal disorders and lost workdays."
      ],
      consequence: [
        "Injury or illness to staff, patients or visitors, with reporting to the Ministry of Manpower under the Workplace Safety and Health Act.",
        "Evacuation of patients and closure of affected areas, disrupting clinical services.",
        "Work injury compensation claims and increased insurance premiums.",
        "Regulatory enforcement by MOM, SCDF or NEA, including stop-work orders or fines.",
        "Damage to facilities and equipment requiring costly repairs and replacement.",
        "Loss of staff productivity due to medical leave and redeployment."
      ],
      currentControls: [
        "Fire safety management plan with annual fire drills and fire safety manager oversight.",
        "Workplace safety and health committee meeting monthly with incident reviews.",
        "Safety-engineered sharps devices and sharps disposal bins at point of use.",
        "Cytotoxic spill kits and PPE with handling procedures in pharmacy and oncology areas.",
        "Outbreak management plan with infection surveillance by Infection Prevention and Epidemiology.",
        "Backup generators and uninterruptible power supply for critical areas tested monthly.",
        "Radiation protection programme with personal dosimeters and annual NEA licence renewal.",
        "Patient handling training and mechanical lifting aids in wards."
      ],
      additionalControls: [
        "Install smart fire detection with integration to the building management system.",
        "Implement a bizSAFE Level Star programme across all facilities.",
        "Introduce real-time sharps injury reporting via mobile app with immediate post-exposure management.",
        "Expand negative-pressure isolation rooms to meet surge requirements during outbreaks.",
        "Conduct infrastructure condition assessment and renewal programme for utilities older than 20 years.",
        "Install ceiling hoists in high-dependency and geriatric wards to reduce manual handling.",
        "Introduce annual hazard identification and risk assessment refresher training for all supervisors."
      ],
      kri: [
        "Number of needlestick and sharps injuries per month (Threshold: > 3)",
        "Workplace injury rate per 100,000 man-hours (Threshold: > 1.0)",
        "% of fire drills completed as scheduled (Target: 100%)",
        "Number of critical utility failures per quarter (Target: 0)",
        "Staff radiation dose exceeding investigation level (Target: 0 cases)",
        "Lost workdays due to manual handling injuries per quarter (Threshold: > 20)",
        "Number of outbreak clusters in wards per quarter (Threshold: > 1)"
      ]
    },

    'Legal & Regulatory': {
      riskStatement: [
        "Breach of HCSA licensing conditions due to lack of awareness of new regulatory requirements resulting in MOH penalties and suspension of services.",
        "Non-compliance with PDPA due to improper collection, use or disclosure of personal data resulting in financial penalties by the PDPC and reputational harm.",
        "Medical negligence claims due to inadequate documentation and informed consent processes resulting in litigation costs and compensation payouts.",
        "Non-compliance with the Healthcare Services Act advertising and service-specific regulations due to unclear approval processes resulting in enforcement action.",
        "Contractual disputes with vendors due to poorly drafted contract terms and weak contract management resulting in financial loss and service disruption.",
        "Failure to comply with Mandatory Reporting requirements due to delayed incident notification resulting in regulatory sanctions.",
        "Breach of the Infectious Diseases Act due to delayed notification of notifiable diseases resulting in public health risk and MOH enforcement.",
        "Non-compliance with controlled drug regulations due to inadequate record keeping and storage resulting in HSA enforcement action and diversion of drugs."
      ],
      consequence: [
        "Financial penalties, licence conditions or suspension of services imposed by MOH, PDPC or HSA.",
        "Litigation costs, settlement payments and increased medical indemnity premiums.",
        "Personal liability and professional disciplinary action against staff involved.",
        "Adverse publicity and loss of confidence among patients and regulators.",
        "Diversion of management time and resources to legal proceedings and regulatory investigations.",
        "Mandatory remediation requirements and enhanced regulatory oversight."
      ],
      currentControls: [
        "Regulatory compliance register maintained by the Legal Office with assigned owners.",
        "Data Protection Officer and PDPA policies with annual staff training.",
        "Informed consent policy and standardised consent forms reviewed by Legal.",
        "Contract templates and legal vetting for contracts above defined thresholds.",
        "Incident reporting system with defined timelines for MOH mandatory reporting.",
        "Notifiable disease reporting through the MOH Communicable Diseases Live and Enhanced Surveillance system.",
        "Controlled drug registers with double-signature and monthly reconciliation audits.",
        "Regular updates on new legislation circulated to department heads by the Legal Office."
      ],
      additionalControls: [
        "Implement a regulatory change management system to track and assign new MOH and HSA requirements.",
        "Conduct annual compliance self-assessment by each department with Legal Office validation.",
        "Introduce electronic informed consent with mandatory documentation of risks discussed.",
        "Deploy contract lifecycle management software with alerts for renewals and obligations.",
        "Implement automated controlled drug cabinets with biometric access and electronic records.",
        "Establish quarterly compliance reporting to the Audit and Risk Committee.",
        "Conduct simulated regulatory inspections ahead of HCSA licence renewal."
      ],
      kri: [
        "Number of PDPA breaches reported to PDPC per year (Target: 0)",
        "Number of open medico-legal claims (Threshold: > 10)",
        "% of mandatory incident reports submitted within timeline (Target: 100%)",
        "Number of HCSA licensing non-compliances identified (Target: 0)",
        "Controlled drug discrepancies per quarter (Target: 0)",
        "% of contracts renewed after expiry date (Threshold: > 5%)",
        "Number of unaddressed audit findings related to regulatory compliance (Threshold: > 2)"
      ]
    },

    'Reputation': {
      riskStatement: [
        "Negative media coverage due to mishandling of a high-profile patient complaint resulting in loss of public confidence in the institution.",
        "Viral social media posts about poor patient experience due to delayed response by the institution resulting in reputational damage to SingHealth.",
        "Public criticism due to a serious adverse event being poorly communicated to the patient's family resulting in loss of trust and formal complaints.",
        "Erosion of public trust due to a data breach involving patient records resulting in adverse media scrutiny and parliamentary questions.",
        "Inappropriate conduct by staff on social media due to lack of awareness of social media guidelines resulting in public backlash.",
        "Reputational harm due to association with partners or vendors involved in misconduct resulting in negative publicity.",
        "Declining patient satisfaction due to long waiting times and poor service recovery resulting in lower ranking in national patient experience surveys.",
        "Damage to SingHealth brand due to inconsistent crisis communication across institutions resulting in conflicting public messages."
      ],
      consequence: [
        "Loss of public confidence and trust in the institution's ability to deliver safe, quality care.",
        "Increased complaints, ministerial enquiries and scrutiny from MOH.",
        "Decline in patient satisfaction scores and patient preference for the institution.",
        "Reduced donor support and philanthropic contributions.",
        "Difficulty attracting and retaining talent due to negative employer brand.",
        "Diversion of senior leadership time to manage media and stakeholder relations."
      ],
      currentControls: [
        "Corporate Communications media handling protocol with designated spokespersons.",
        "Patient feedback management system with defined response timelines.",
        "Open disclosure policy for communicating adverse events to patients and families.",
        "Social media monitoring by Corporate Communications.",
        "Staff code of conduct and social media guidelines.",
        "Crisis communication plan coordinated with SingHealth Group Communications.",
        "Service recovery training for frontline staff.",
        "Vendor due diligence and reputational screening for major partnerships."
      ],
      additionalControls: [
        "Implement real-time social media listening tools with alerts for emerging issues.",
        "Conduct annual crisis communication simulation exercises with senior leadership.",
        "Introduce patient experience ambassadors in high-volume clinics.",
        "Train clinicians in open disclosure and difficult conversations through simulation.",
        "Establish a cluster-wide reputational risk escalation protocol.",
        "Publish service performance indicators on institutional websites to improve transparency.",
        "Develop pre-approved holding statements for common crisis scenarios."
      ],
      kri: [
        "Number of negative media reports per quarter (Threshold: > 2)",
        "Net Promoter Score from post-visit patient surveys (Threshold: < 50)",
        "% of complaints resolved within 10 working days (Target: ≥ 90%)",
        "Number of ministerial or MP enquiries per quarter (Threshold: > 5)",
        "Patient Experience Survey overall rating (Target: ≥ 85%)",
        "Social media negative sentiment ratio (Threshold: > 20%)",
        "Number of complaints escalated to MOH per quarter (Threshold: > 3)"
      ]
    }
  }
};
