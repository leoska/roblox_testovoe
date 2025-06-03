import CronHistory, {
  CronHistoryAttributes,
} from '../models/cron-history.model';

const cronHistoryCreate = ({
  task,
  server,
  status,
  started_at,
  finished_at,
}: CronHistoryAttributes) =>
  CronHistory.create({
    task,
    server,
    status,
    started_at,
    finished_at,
  });

export default cronHistoryCreate;
