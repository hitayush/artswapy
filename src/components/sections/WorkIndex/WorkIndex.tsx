import { projects, site, work } from '@/content/site';
import WorkHorizontal from './WorkHorizontal.client';

export default function WorkIndex() {
  return (
    <WorkHorizontal
      projects={projects}
      to={site.email.address}
      tag={work.tag}
      heading={work.heading}
      body={work.body}
      enquiry={work.enquiry}
      nextStep={work.nextStep}
    />
  );
}


