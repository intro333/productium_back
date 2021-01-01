import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../../config/config.service';
import { CommunityService } from '../../community/community.service';
import { CommunityServiceInfo, CommunitySubscribe } from '../../model/community.entity';
import { CommunityServiceInfoDTO } from '../swagger/community.dto';

async function run() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const communityService = new CommunityService(
    connection.getRepository(CommunityServiceInfo),
    connection.getRepository(CommunitySubscribe),
  );
  const dto = CommunityServiceInfoDTO.from({
    id: 1,
    membersCount: 112,
    readyPercent: 62
  });
  return communityService.create(dto).then(r => (console.log('done ->', r.membersCount), r));
  // return await Promise.all(work);
}

run()
  .then(() => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));