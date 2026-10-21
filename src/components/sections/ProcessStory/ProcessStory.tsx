import { process } from '@/content/site';
import ProcessSpine from './ProcessSpine.client';

export default function ProcessStory() {
  return <ProcessSpine heading={process.heading} stages={process.stages} />;
}
