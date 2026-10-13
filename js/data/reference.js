/* Reference sets from SingHealth ERM Tool v3.1 (Office of Risk Services). */
window.ERMIS = window.ERMIS || {};

ERMIS.REF = (function () {
  var INSTITUTIONS = [
    { code: 'SGH', name: 'Singapore General Hospital' },
    { code: 'CGH', name: 'Changi General Hospital' },
    { code: 'SKH', name: 'Sengkang General Hospital' },
    { code: 'KKH', name: "KK Women's and Children's Hospital" },
    { code: 'NCCS', name: 'National Cancer Centre Singapore' },
    { code: 'NHCS', name: 'National Heart Centre Singapore' },
    { code: 'NNI', name: 'National Neuroscience Institute' },
    { code: 'SNEC', name: 'Singapore National Eye Centre' },
    { code: 'NDCS', name: 'National Dental Centre Singapore' },
    { code: 'SCH', name: 'SingHealth Community Hospitals' },
    { code: 'SHP', name: 'SingHealth Polyclinics' }
  ];

  var DOMAINS = [
    { name: 'Strategic', desc: "Risks and uncertainties, associated with an organisation's business strategy that impact its ability to achieve the vision, mission and strategic objectives with the ultimate goal of creating and protecting shareholder and stakeholder value that may result from internal and / or external sources, including but not limited to alliances, partnerships, new ventures with external parties etc." },
    { name: 'Clinical', desc: 'Risk relating to (i) issues, conditions, circumstances, events, actions that have a direct adverse impact on the treatment, quality of care; (ii) adverse clinical outcome that is unexpected and / or (iii) failure to meet expected professional standards of patient care.' },
    { name: 'Education', desc: 'Risk associated with training & education programmes / activities provided to residents, trainees, employees and / or non-employees, including but not limited to residency programs, under / post graduate attachments, fellowships, internships, continuing education for professional, skills enhancement, up-skilling and / or re-skilling etc.' },
    { name: 'Research', desc: 'Risk associated with on-going and / or new research activities, including but not limited to clinical trials, Research Ethics, oversight by Review Boards / Bio-safety Committees etc. in assuring safety and well-being of research subjects (animals / human); staff safety, management of Intellectual Property and bio-hazards etc.' },
    { name: 'Human Capital', desc: 'Risk that relates to recruitment, training & development and retention of key employees, including risks associated with succession planning, equity & fairness in staff engagement, remuneration, compliance with prevailing legal and regulatory requirements etc.' },
    { name: 'Financial', desc: 'Risk that impacts ability to generate sufficient funding and / or revenue; manage costs and optimise resource allocation for productivity and growth; develop & deploy proactive forward-looking financial management capabilities; and provide effective oversight over compliance with internal controls.' },
    { name: 'Operations', desc: 'Risk relating to business operations, including but not limited to procurement, inventory management, facilities management etc. that result from inadequate or failed internal processes, people or systems.' },
    { name: 'Information Technology', desc: 'Risk associated with availability and reliability of (i) IT infrastructure systems including hardware / software / applications evaluation & selection, system inter-operability & scalability, (ii) IT processes including but not limited to systems operations & maintenance (including upgrades), network interconnections, technology obsolescence, access / data / network security, data management and (iii) continuity / contingency planning & support to organisation during unplanned system downtime. (Examples: computerized physician order entry and radiology picture archiving and communication systems and off-site access to patient data / information).' },
    { name: 'Technology', desc: "Risk associated with investment in and deployment of information technology and associated equipment, machines, hardware, software, devices, tools etc. (e.g. telemedicine, e-health, IT applications etc.) to enhance clinical / operational efficiency and effectiveness; to secure business objectives, enhance clinical outcomes etc. Also risk associated with investment and application of biomedical, medical radiologic and / or nanotechnologies in clinical service delivery, research and education with the aim of applying new diagnostic / treatment modalities to enhance clinical outcomes and quality of care for patients as well as integration of care delivery by using advanced medical equipment systems, machines, robotics, hardware, software, devices, tools etc. in areas such as biomedicine (e.g. gene therapy), telemedicine, robotic / hybrid surgery systems, e-health etc. to secure the organisation's Vision, enhance clinical outcomes and optimize investment & operational returns. This category of risk also includes risks associated with obsolescence and maintenance." },
    { name: 'Hazard', desc: 'Risk associated with situations with the potential to cause harm; including but not limited to workplace health & safety, physical loss of assets or reduction in their value arising from facility management, natural hazards, fire etc., construction / renovation activities, etc. This category of risk includes risks associated with business continuity and emergency planning as well as response to crisis situations (e.g. flood, disease outbreak, power outage).' },
    { name: 'Legal & Regulatory', desc: 'Risk associated with licensure, statutes, standards, regulations, service liability, management liability and issues relating to patents, intellectual property rights, etc.' },
    { name: 'Reputation', desc: 'Risk associated with the brand / projected image and / or standing of organization in the local community, regional and international arena.' }
  ];

  // Ordered high → low, as in the workbook drop-downs.
  var IMPACT = [
    { name: 'Extreme', level: 5, score: 15, alt: 'Disastrous' },
    { name: 'Major', level: 4, score: 12, alt: 'Serious' },
    { name: 'Moderate', level: 3, score: 9, alt: 'Endurable' },
    { name: 'Minor', level: 2, score: 6 },
    { name: 'Insignificant', level: 1, score: 3 },
    { name: "Unsure/Don't Know", level: 0, score: 7.5 }
  ];

  var LIKELIHOOD = [
    { name: 'Frequent', level: 5, score: 10, desc: ['Expected to occur on a weekly basis or more frequently e.g. every other day', '≥75% chance of occurring within the 3 years horizon', 'Strong evidence to suggest the risk will occur or may occur repeatedly'] },
    { name: 'Likely', level: 4, score: 8, desc: ['Will probably occur in most circumstances like on a monthly basis or several times a year', 'Between 50% and 75% chance of occurring within the 3 years horizon', 'Some evidence to suggest expected occurrence'] },
    { name: 'Possible', level: 3, score: 6, desc: ['Might occur at some time every 1 to 2 years', 'Between 25% and 50% chance of occurring within the 3 years horizon', 'Has occurred before, and some indications to suggest possibility of re-occurrence'] },
    { name: 'Unlikely', level: 2, score: 4, desc: ['Could occur at some time in 2 to 5 years', 'Between 5% and 25% chance of occurring within the 3 years horizon', 'Conceivable but no indications or evidence to suggest occurrence under normal circumstances'] },
    { name: 'Rare', level: 1, score: 2, desc: ['May occur only during exceptional circumstances every 5 to 30 years', '< 5% chance of occurring within the 3 years horizon', 'Remote and not expected to occur, conceivable only under extreme circumstances'] },
    { name: "Unsure/Don't Know", level: 0, score: 5, desc: [] }
  ];

  var EFFECTIVENESS = [
    { name: 'Nearly complete', scale: 1, value: 0.95, desc: 'Reduced by 95%', def: 'Always or almost always preventing or mitigating risk' },
    { name: 'Significant', scale: 2, value: 0.9, desc: 'Reduced by 90%', def: 'Having or likely to have important influence or effect on risk prevention and mitigation' },
    { name: 'Substantial', scale: 3, value: 0.75, desc: 'Reduced by 75%', def: 'Largely but not wholly able to prevent or mitigate risk' },
    { name: 'Moderate', scale: 4, value: 0.6, desc: 'Reduced by 60%', def: 'Limited in scope or effect on risk prevention and mitigation' },
    { name: 'Minor', scale: 5, value: 0.3, desc: 'Reduced by 30%', def: 'Comparatively unimportant regarding risk prevention and mitigation' },
    { name: 'Minimal', scale: 6, value: 0.1, desc: 'Reduced by 10%', def: 'Barely adequate at preventing or mitigating risk' },
    { name: 'None', scale: 7, value: 0, desc: 'Not reduced at all', def: 'No effect at either preventing or mitigating risk' }
  ];

  var CONTROL_CHANGE = [
    { name: 'Maximum effectiveness', value: 0.95 },
    { name: 'Significant improvement', value: 0.9 },
    { name: 'Substantial improvement', value: 0.75 },
    { name: 'Moderate improvement', value: 0.6 },
    { name: 'Minor improvement', value: 0.3 },
    { name: 'Minimal improvement', value: 0.1 },
    { name: 'No Change', value: 0 },
    { name: 'Minimal decrease', value: -0.1 },
    { name: 'Minor decrease', value: -0.3 },
    { name: 'Moderate decrease', value: -0.6 },
    { name: 'Substantial decrease', value: -0.75 },
    { name: 'Significant decrease', value: -0.9 },
    { name: 'Control removed', value: -1 }
  ];

  var ADEQUACY = [
    { key: 'under', name: 'Under-controlled', action: 'Modify current control(s), substitute with new control(s) or add unimplemented control(s).' },
    { key: 'pot-under', name: 'Potentially under-controlled', action: 'Modify current control(s), substitute with new control(s) or add unimplemented control(s).' },
    { key: 'adequate', name: 'Adequately controlled', action: 'Continue to manage via existing controls and monitor indicators.' },
    { key: 'pot-over', name: 'Potentially over-controlled', action: 'Consider if excess resources are being allocated. Excess resources can be allocated to under-controlled risk(s).' }
  ];

  var BANDS = [
    { key: 'vh', name: 'Very High' },
    { key: 'h', name: 'High' },
    { key: 'm', name: 'Medium' },
    { key: 'l', name: 'Low' }
  ];

  var RECOMMENDED_ACTION = [
    {
      bands: ['Very High', 'High'],
      response: [
        'On going Senior Management oversight is required',
        'Steps must be taken to lower risk level to as low as reasonably practicable',
        'Risk should be continuously monitored & reviewed',
        'Action plans and additional resources / controls should be implemented where possible and monitor regularly',
        'A timetable for mitigation actions should be established',
        'Data trending and monitoring'
      ],
      timeline: 'Within 3 months or earlier as required / stipulated'
    },
    {
      bands: ['Medium'],
      response: [
        'Senior management attention and follow-up actions as required',
        'Adequacy of existing controls should be assessed to determine if further action or treatment is needed',
        'A timetable for mitigation actions should be established',
        'Data trending and monitoring',
        'Improvement project may be undertaken'
      ],
      timeline: 'Within 6 months or earlier as required / stipulated'
    },
    {
      bands: ['Low'],
      response: [
        'Continue to manage via existing controls and normal operating procedures',
        'Data trending and monitoring',
        'Report as per routine',
        'Risk can be treated when resources are available i.e. a longer time frame for implementing mitigation actions may be allowed'
      ],
      timeline: 'Within 6 to 12 months or earlier as required / stipulated'
    }
  ];

  var GLOSSARY = [
    { term: 'Risk Owner', def: ['An individual or a function with the authority and accountability to oversee the appropriate management of a particular risk.', 'Responsible for monitoring the risk, evaluating its status, and ensuring appropriate responses are designed and implemented.'] },
    { term: 'Current Controls', def: ['Risk mitigation (process, policy, device or action) currently in place at the point of review, to reduce the impact and/or likelihood of a given risk.', 'Actions established through policies and procedures that help ensure management directives to mitigate risks are carried out.'], examples: ['Clinical SOPs', 'Dual sign-off procedures', 'Data encryption systems', 'Audit trails'] },
    { term: 'Additional Controls', def: ["Proposed, new or improved actions not yet in place at the point of review, to further mitigate the risk or bring it within the organisation's risk appetite (the level of risk that an organisation is willing to accept in pursuit of its objectives).", 'A review of control gaps is encouraged to determine whether additional control activities are necessary, and whether existing ones are currently functioning effectively.'], examples: ['Implement a new electronic consent process', 'Addition of routine compliance audits', 'Training updates or certification requirements'] },
    { term: 'Action by (Implementor)', def: ['Individual assigned to be in charge of implementation of current/additional control measures to assure proper, smooth and effective implementation of controls to mitigate a particular risk.'] },
    { term: 'Monitored by (Check and Balance)', def: ['Individual assigned to be in charge of monitoring that all control measures are implemented and functional.', 'Ideal to be a different individual from the implementor (where possible).'] },
    { term: 'Key Risk Indicator (KRI)', def: ['Metric developed by an organisation to provide an early signal of increasing/changing risk exposure in various areas of the enterprise.', 'Metric is typically forward-looking (predictive), linked to specific risk(s), designed to help monitor change in the level of risk exposure, and used to trigger alert(s) or action(s) if threshold(s) is/are breached.', 'A good KRI is relevant to specific objectives or risks, measurable using reliable data, comparable over time, timely (enabling early response) and actionable, so the risk owner knows what steps to take.'], examples: ['% of overtime hours logged per department over 30-day average', '% of medication errors per 1000 prescriptions', 'Hospital Acquired Infection (HAI) Rate', 'Staff turnover rate', 'Number of unaddressed audit findings', '% of critical systems without backup or recovery plan'] },
    { term: 'Key Performance Indicator (KPI)', def: ['Metric that measures value to demonstrate how effective an entity is in achieving its objectives.', 'It is a performance-based metric used by an organisation to track progress toward achievement of strategic, operational, or financial goals etc.', 'Metric is most effective when aligned to strategic objectives and monitored in conjunction with risk data. This Metric is not a Risk Metric.'] },
    { term: 'Inherent Risk', def: ['Level of risk to an entity in the absence of any actions that Management might take to alter the risk\'s "likelihood" or "impact".', 'Level of risk that exists BEFORE any controls or mitigation measures/strategies are in place.'] },
    { term: 'Residual Risk', def: ['Risk that remains after Management has taken action to reduce the "impact" or "likelihood" of an adverse event.', 'Represents the remaining exposure AFTER applying controls, processes or treatments.'] }
  ];

  // Impact descriptors: [Extreme, Major, Moderate, Minor, Insignificant]
  var IMPACT_CATEGORIES = [
    { key: 'whs', name: 'Workplace Health and Safety (Staff / Public)', levels: [
      'Death, fatal occupational disease or exposure, or multiple major injuries',
      'Serious injuries, serious occupational diseases or exposure (includes amputations, major fractures, multiple injuries, occupational cancers, diagnosed mental illnesses, acute poisoning, disabilities, and noise induced hearing loss)',
      'Injury or ill health (including mental well being) requiring medical treatment (includes lacerations, burns, sprains, minor fractures, psychosocial stress, dermatitis, and work related musculoskeletal disorders)',
      'Injury or ill health (including mental well being) requiring first aid only (includes minor cuts and bruises, irritation, ill health with temporary discomfort, fatigue)',
      'Negligible injury'] },
    { key: 'patient', name: 'Patient Safety', levels: [
      'Patients with death, unrelated to the natural course of the illness & differing from the immediate expected outcome of the patient management, or: procedures involving the wrong patient or body part; suicide; retained instruments or other material requiring surgical procedure; intravascular gas embolism resulting in death or neurological damage; haemolytic blood transfusion; medication error leading to death; maternal death or serious morbidity associated with labour or delivery; infant abduction or discharge to wrong family',
      'Patients with major permanent loss of function (sensory, motor, physiologic or intellectual) unrelated to the natural course of the illness and differing from the expected outcome of patient management, or: disfigurement; surgical intervention required',
      'Patients with permanent lessening of bodily functioning (sensory, motor, physiologic or intellectual) unrelated to the natural course of the illness and differing from the expected outcome of patient management, or: increased length of stay; additional operation or procedure',
      'Patients requiring increased level of care, including: review & evaluation; additional investigation; referral to another clinician',
      'Patients with no injury or increased level of care or length of stay. Will include near misses'] },
    { key: 'environment', name: 'Environment', levels: [
      'Catastrophic impact on the environment (massive leakage of fuel, emission / spillage of environmental pollutants). Regulatory non-compliance resulting in prosecution by authorities. Adverse publicity resulting in severe loss of confidence in SingHealth Corporate Office. Affects all of the critical service areas',
      'Major impact on the environment (hazardous waste, depletion of natural resources through high consumption of water / fuel / electricity). Regulatory non-compliance identified and can be rectified within 6mths. Adverse publicity, can be reduced with careful handling. Affects most of the critical service areas',
      'Moderate impact on the environment (air pollution, global warming, ozone layer depletion). Regulatory non-compliance identified and can be rectified. Potential for adverse publicity, avoidable with careful handling. Affects some of the critical service areas',
      'Minor impact on the environment (non-hazardous waste, high consumption of paper, site contamination, land and water pollution). Evidence of regulatory compliance. Minimal risk to public image. Affects only the non-critical service areas',
      'No impact on the environment. No regulatory requirement. No risk to public image. No impact on service'] },
    { key: 'financial', name: 'Financial', levels: [
      'Financial loss of > 5% of prior year annual operating expenses, or > SGD1,000,000 for Centre / Polyclinic, or > SGD5,000,000 for Hospital / Headquarter',
      'Financial loss of > 2% - 5% of prior year annual operating expenses, or > SGD500,000 - SGD1,000,000 for Centre / Polyclinic, or > SGD1,000,000 - SGD5,000,000 for Hospital / Headquarter',
      'Financial loss of > 1% - 2% of prior year annual operating expenses, or SGD200,000 - SGD500,000 for Centre / Polyclinic, or SGD500,000 - SGD1,000,000 for Hospital / Headquarter',
      'Financial loss of 0.5% - 1% of prior year annual operating expenses, or SGD100,000 - < SGD200,000 for Centre / Polyclinic, or SGD200,000 - < SGD500,000 for Hospital / Headquarter',
      'Financial loss of < 0.5% of prior year annual operating expenses, or < SGD100,000 for Centre / Polyclinic, or < SGD200,000 for Hospital / Headquarter'] },
    { key: 'mcs', name: 'Mission Critical System Disruption (Unplanned, Synapxe-managed IT systems)', levels: [
      'Downtime > 3.6 hours', 'Downtime 2 to 3.6 hours', 'Downtime 44 to 120 minutes', 'Downtime 22 to 44 minutes', 'Downtime < 22 minutes'] },
    { key: 'service', name: 'Service Disruption', levels: [
      'Critical (widespread and prolonged) disruption. Complete loss of service. Prolonged (more than 24 hours) impact on the delivery of patient care or the ability to continue with critical and key support services',
      'Widespread but temporary disruptions. Major loss of service. Major (between 8 hours to 24 hours) impact on the delivery of patient care or the ability to continue with critical and key support services',
      'Isolated & prolonged disruptions. Some loss of service. Some (between 4 hours to 8 hours) impact on the delivery of patient care or the ability to continue with critical and key support services',
      'Isolated and temporary disruptions. Reduced efficiency. Short-term (less than 4 hours) impact on the delivery of patient care or the ability to continue with critical and key support services',
      'Insignificant interruption. No loss of service. Does not impact on the delivery of patient care or the ability to continue with critical and key support services'] },
    { key: 'itsec', name: 'Information & IT Security: System Breaches', levels: [
      'Breach of security or virus attack resulting in suspension of services (>1 day)',
      'Breach of security or virus attack resulting in suspension of services (≤ 1 day)',
      'Breach of security or virus attack resulting in temporary disruption of services (2 to <4 hours)',
      'Breach of security or virus attack resulting in warnings',
      'Unsuccessful attempts to gain access to systems or data'] },
    { key: 'data', name: 'Information & IT Security: Leakage or Corruption of Information / Data', levels: [
      'Unauthorised disclosure involving sensitive health information (SHI) that could (a) lead to stigmatization or discrimination, or (b) warrants special protection by legislation and affecting more than / equal to 500 individuals',
      'Unauthorised disclosure of personal data not involving SHI affecting more than / equal to 500 individuals, or unauthorised disclosure involving SHI affecting less than 500 individuals',
      'Unauthorised disclosure of personal data not involving SHI affecting less than 500 individuals. Calls for specific actions to notify affected individuals whose personal data have been compromised',
      'Administrative errors that can be recovered in time such that the data recipient is unlikely to make further data disclosure. Inconsequential data loss, such as loss of data protected by encryption and strong passwords in portable storage media',
      'Personal data loss that only involves business contact information. Inadvertent disclosures to other staff or other persons under obligation to confidentiality'] },
    { key: 'hc', name: 'Human Capital: Unplanned Loss of Staff (Key / Non-Key)', levels: [
      'Unplanned loss of ≥ 20% of key staff and/or ≥ 25% of non-key staff in a financial year, with no potential candidates for immediate replacement, impacting on the critical business functions',
      'Unplanned loss of 15% - 19% of key staff and/or 20% - 24% of non-key staff in a financial year, with no potential candidates for immediate replacement, impacting on the critical business functions',
      'Unplanned loss of 10% - 14% of key staff and/or 15% - 19% of non-key staff in a financial year, with no potential candidates for immediate replacement, impacting on the critical business functions',
      'Unplanned loss of 5% - 9% of key staff and/or 10% - 14% of non-key staff in a financial year, with no potential candidates for immediate replacement, impacting on the critical business functions',
      'Unplanned loss of < 5% of key staff and/or < 10% of non-key staff in a financial year, with no impact on the critical business functions'] },
    { key: 'reputation', name: 'Reputation', levels: [
      "SingHealth Cluster's credibility and effectiveness called to question at the national level and beyond. Negative publicity or damage to reputation from a national perspective. Total loss of credibility and key stakeholders' confidence. Political intervention required",
      "Negative publicity in multiple media (including social media). Damage to reputation from a healthcare industry perspective. Loss of credibility and key stakeholders' confidence. Widespread negative public discussions",
      "Unfavourable publicity in multiple media (including social media). Damage to reputation from key stakeholders' perspective. Some public discussions and calls for specific actions",
      "Publicity on adverse event contained / Limited media exposure. Limited impact on credibility and key stakeholders' confidence",
      "No significant adverse publicity. No impact on credibility and key stakeholders' confidence"] },
    { key: 'accreditation', name: 'Accreditation and Licensing', levels: [
      'Loss of accreditation. Assigned large fines and debarment from a sponsoring or compliance agency',
      'Placed on probation by accrediting agency; subject to reviews. Assigned fines and penalties by a sponsoring or compliance agency',
      'Failure to meet one or more accreditation standards and in receipt of a letter of warning from the regional accrediting agency. Failure to meet one or more compliance requirement that might trigger a letter of warning from a sponsoring agency',
      'Weakness in meeting one or more accreditation standards of accrediting agency. Intermittent non-compliance with requirements of sponsoring agency',
      'Meeting all accreditation standards. Compliance with requirements of sponsoring agencies'] },
    { key: 'legal', name: 'Legal and Regulations', levels: [
      'Statutory punishment resulting in suspension / removal of license, prison term or criminal liability. Ministerial censure or direct intervention from authorities',
      'Sanction or penalty from regulatory body (e.g. fines)',
      'Formal warning from regulatory body',
      'Verbal warning by authorities',
      'No adverse legal and regulatory consequence'] }
  ];

  // Which impact descriptor categories are most relevant to each risk domain.
  var DOMAIN_IMPACT = {
    'Strategic': ['financial', 'reputation'],
    'Clinical': ['patient'],
    'Education': ['accreditation', 'patient'],
    'Research': ['patient', 'legal'],
    'Human Capital': ['hc', 'whs'],
    'Financial': ['financial'],
    'Operations': ['service'],
    'Information Technology': ['mcs', 'itsec', 'data'],
    'Technology': ['service', 'mcs'],
    'Hazard': ['whs', 'environment', 'service'],
    'Legal & Regulatory': ['legal', 'accreditation'],
    'Reputation': ['reputation']
  };

  var OBJECTIVE_PERSPECTIVES = ['Strategic', 'Operational', 'Financial', 'Compliance', 'Reputational', 'Reporting'];
  var FREQUENCIES = ['Weekly', 'Monthly', 'Quarterly', 'Half-yearly', 'Annually', 'Ad hoc'];

  // Reporting periods, SingHealth financial year (April–March).
  var PERIODS = ['FY2024Q1', 'FY2024Q2', 'FY2024Q3', 'FY2024Q4', 'FY2025Q1', 'FY2025Q2', 'FY2025Q3', 'FY2025Q4', 'FY2026Q1', 'FY2026Q2', 'FY2026Q3'];
  var CURRENT_PERIOD = 'FY2026Q3';

  function institutionName(code) {
    for (var i = 0; i < INSTITUTIONS.length; i++) if (INSTITUTIONS[i].code === code) return INSTITUTIONS[i].name;
    return code || '';
  }
  function formatPeriod(p) { return p ? p.replace(/^FY(\d{4})Q(\d)$/, 'FY$1 Q$2') : ''; }

  return {
    INSTITUTIONS: INSTITUTIONS, DOMAINS: DOMAINS, IMPACT: IMPACT, LIKELIHOOD: LIKELIHOOD,
    EFFECTIVENESS: EFFECTIVENESS, CONTROL_CHANGE: CONTROL_CHANGE, ADEQUACY: ADEQUACY, BANDS: BANDS,
    RECOMMENDED_ACTION: RECOMMENDED_ACTION, GLOSSARY: GLOSSARY, IMPACT_CATEGORIES: IMPACT_CATEGORIES,
    DOMAIN_IMPACT: DOMAIN_IMPACT, OBJECTIVE_PERSPECTIVES: OBJECTIVE_PERSPECTIVES, FREQUENCIES: FREQUENCIES,
    PERIODS: PERIODS, CURRENT_PERIOD: CURRENT_PERIOD, institutionName: institutionName, formatPeriod: formatPeriod
  };
})();
