import { projects, site, work } from '@/content/site';
import WorkIndexList from './WorkIndexList.client';

export default function WorkIndex() {
  return (
    <WorkIndexList
      projects={projects}
      to={site.email.address}
      enquiry={work.enquiry}
    />
  );
}

