import { projects, site, work } from '@/content/site';
import WorkHorizontal from './WorkHorizontal.client';

export default function WorkIndex() {
  return (
    <WorkHorizontal
      projects={projects}
      to={site.email.address}
      enquiry={work.enquiry}
      heading={work.heading}
    />
  );
}


