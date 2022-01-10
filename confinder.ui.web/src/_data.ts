enum QualisIndex {
  A1 = 'A1',
  A2 = 'A2',
  A3 = 'A3',
  A4 = 'A4',
  B1 = 'B1',
  B2 = 'B2',
  B3 = 'B3',
  B4 = 'B4',
  C = 'C',
}

export type Conference = {
  id: number;
  initials: string;
  name: string;
  qualisIndex: QualisIndex;
  location: string;
  startDate: string;
  endDate: string;
};

const conferences: Conference[] = [
  {
    id: 8,
    initials: '3DV',
    name: 'International Conference on 3D Vision',
    qualisIndex: QualisIndex.A2,
    location: 'New Orleans',
    startDate: '2021-12-01 00:00:00',
    endDate: '2021-12-03 00:00:00',
  },
  {
    id: 11,
    initials: 'AAAI',
    name: 'Conference on Artificial Intelligence',
    qualisIndex: QualisIndex.A1,
    location: 'Pisa',
    startDate: '2022-02-22 00:00:00',
    endDate: '2022-03-01 00:00:00',
  },
  {
    id: 17,
    initials: 'ACC',
    name: 'American Control Conference',
    qualisIndex: QualisIndex.A1,
    location: 'Atlanta',
    startDate: '2022-06-08 00:00:00',
    endDate: '2022-06-10 00:00:00',
  },
  {
    id: 18,
    initials: 'ACCV',
    name: 'Asian Conference on Computer Vision',
    qualisIndex: QualisIndex.A2,
    location: 'Melbourne',
    startDate: '2020-11-30 00:00:00',
    endDate: '2020-12-04 00:00:00',
  },
  {
    id: 26,
    initials: 'ACL',
    name: 'Annual Meeting of the Association for Computational Linguistics',
    qualisIndex: QualisIndex.A1,
    location: 'Online',
    startDate: '2021-08-01 00:00:00',
    endDate: '2021-08-06 00:00:00',
  },
  {
    id: 28,
    initials: 'ACM',
    name: 'CCS	ACM Symposium on Computer and Communications Security',
    qualisIndex: QualisIndex.A1,
    location: 'Koblenz',
    startDate: '2021-11-14 00:00:00',
    endDate: '2021-11-19 00:00:00',
  },
  {
    id: 34,
    initials: 'ACMMM',
    name: 'ACM International Conference on Multimedia',
    qualisIndex: QualisIndex.A1,
    location: 'Austin',
    startDate: '2021-10-20 00:00:00',
    endDate: '2021-10-24 00:00:00',
  },
  {
    id: 67,
    initials: 'AISTATS',
    name: 'International Conference on Artificial Intelligence and Statistics',
    qualisIndex: QualisIndex.A1,
    location: 'Online',
    startDate: '2021-04-13 00:00:00',
    endDate: '2021-04-15 00:00:00',
  },
  {
    id: 96,
    initials: 'ASE',
    name: 'IEEE/ACM International Conference on Automated Software Engineering',
    qualisIndex: QualisIndex.A1,
    location: 'Helsinki',
    startDate: '2021-11-15 00:00:00',
    endDate: '2021-11-19 00:00:00',
  },
  {
    id: 99,
    initials: 'ASIACSS',
    name: 'ACM on Asia Conference on Computer and Communications Security',
    qualisIndex: QualisIndex.A1,
    location: 'Atlanta',
    startDate: '2022-05-30 00:00:00',
    endDate: '2022-06-03 00:00:00',
  },
];

export function getConferences() {
  return conferences;
}

export function getConference(id: number) {
  return conferences.find((conference) => conference.id === id);
}
