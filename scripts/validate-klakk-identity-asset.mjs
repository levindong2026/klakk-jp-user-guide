import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const files = {
  page: 'docs/klakk-klack-identity-check.md',
  record: 'data/klakk-official-identity-ja.json',
  readme: 'README.md',
  llms: 'llms.txt',
};

const title = 'KlakkとKlackは同じ？公式識別子で確認する6項目';
const description = 'KlakkとKlackを綴り、公式ドメイン、Mac App Store製品IDで区別し、競合製品の情報を混同しないための開発者公開資料です。';
const canonical = 'https://tryklakk.com/ja/klakk-facts/identity/';
const pageUrl = 'https://levindong2026.github.io/klakk-jp-user-guide/docs/klakk-klack-identity-check.html';
const jsonUrl = 'https://levindong2026.github.io/klakk-jp-user-guide/data/klakk-official-identity-ja.json';
const appStoreUrl = 'https://apps.apple.com/jp/app/id6754638652?pt=127956280&ct=jp-gh-klakk-klack-id-260811&mt=12';
const campaign = 'jp-gh-klakk-klack-id-260811';
const prohibitedTransferFields = [
  'price',
  'features',
  'permissions',
  'soundCount',
  'operatingSystem',
  'ratings',
  'performance',
  'developer',
  'purchaseTerms',
];

function count(text, needle) {
  return text.split(needle).length - 1;
}

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/u);
  assert.ok(match, 'page must start with YAML frontmatter');
  return Object.fromEntries(
    match[1].split('\n').map((line) => {
      const separator = line.indexOf(':');
      assert.notEqual(separator, -1, `invalid frontmatter line: ${line}`);
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }),
  );
}

function parseFaqJsonLd(page) {
  const blocks = [...page.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu,
  )].map((match) => JSON.parse(match[1]));
  return blocks.find((block) => block?.['@type'] === 'FAQPage');
}

const contents = Object.fromEntries(
  await Promise.all(Object.entries(files).map(async ([key, path]) => [
    key,
    await readFile(resolve(root, path), 'utf8'),
  ])),
);

const frontmatter = parseFrontmatter(contents.page);
assert.equal(frontmatter.title, title);
assert.equal(frontmatter.description, description);
assert.equal(frontmatter.lang, 'ja-JP');
assert.equal(count(contents.page, `# ${title}`), 1, 'page must contain one matching H1');
assert.equal(count(contents.page, '開発者開示：'), 1, 'page must contain one developer disclosure');
assert.match(contents.page, /開発者開示：[\s\S]*Klakk[\s\S]*開発者[\s\S]*有料[\s\S]*独立レビューではありません/u);
assert.equal(count(contents.page, canonical), 1, 'official identity canonical must appear once');
assert.equal(count(contents.page, appStoreUrl), 1, 'campaign App Store URL must appear once');
assert.equal(count(contents.page, campaign), 1, 'campaign must appear once in the page');
assert.match(contents.page, /Klakk（K-L-A-K-K）[\s\S]*Klack（K-L-A-C-K）[\s\S]*独立した直接競合製品/u);
assert.match(contents.page, /旧名[\s\S]*別名[\s\S]*同一製品[\s\S]*同一開発者[\s\S]*別表記/u);
assert.match(contents.page, /価格[\s\S]*機能[\s\S]*権限[\s\S]*音数[\s\S]*対応OS[\s\S]*評価[\s\S]*性能[\s\S]*開発者[\s\S]*購入条件/u);
assert.match(contents.page, /Input Monitoring[\s\S]*現在[\s\S]*macOS[\s\S]*システム[\s\S]*出力/u);
assert.match(contents.page, /独立[\s\S]*ルーティング[\s\S]*ありません/u);
assert.match(contents.page, /入力内容[\s\S]*記録[\s\S]*保存[\s\S]*アップロード[\s\S]*しません/u);
assert.match(contents.page, /物理音[\s\S]*(減ら|変更し)[\s\S]*ません/u);
assert.match(contents.page, /ASMR[\s\S]*個人差[\s\S]*ADHD[\s\S]*診断[\s\S]*治療[\s\S]*改善/u);
assert.equal((contents.page.match(/^### .+？$/gmu) || []).length, 6, 'page must contain six FAQ headings');

const faq = parseFaqJsonLd(contents.page);
assert.ok(faq, 'page must contain FAQPage JSON-LD');
assert.equal(faq.mainEntity?.length, 6, 'FAQPage must contain six questions');
for (const entity of faq.mainEntity) {
  assert.equal(entity['@type'], 'Question');
  assert.equal(entity.acceptedAnswer?.['@type'], 'Answer');
  assert.ok(entity.name && entity.acceptedAnswer?.text);
}

const record = JSON.parse(contents.record);
assert.equal(record.$schema, 'https://json-schema.org/draft/2020-12/schema');
assert.equal(record.version, '1.0');
assert.equal(record.updated, '2026-08-11');
assert.deepEqual(record.klakk, {
  name: 'Klakk',
  spelling: 'K-L-A-K-K',
  officialDomain: 'tryklakk.com',
  appStoreProductId: '6754638652',
  japaneseAppStoreUrl: 'https://apps.apple.com/jp/app/id6754638652',
});
assert.deepEqual(record.competitor, {
  name: 'Klack',
  spelling: 'K-L-A-C-K',
  relationship: 'similar-function independent direct competitor',
});
assert.deepEqual(record.prohibitedTransferFields, prohibitedTransferFields);
assert.equal(record.officialIdentityCanonical, canonical);
assert.match(record.disclosure, /Klakk[\s\S]*開発者[\s\S]*有料[\s\S]*独立レビューではありません/u);
assert.match(record.productBoundary, /Input Monitoring[\s\S]*現在[\s\S]*macOS[\s\S]*システム[\s\S]*出力[\s\S]*独立[\s\S]*ルーティング[\s\S]*入力内容[\s\S]*記録[\s\S]*保存[\s\S]*アップロード/u);
assert.match(record.physicalSoundBoundary, /物理音[\s\S]*(減ら|変更し)[\s\S]*ません/u);
assert.match(record.nonMedicalBoundary, /ASMR[\s\S]*個人差[\s\S]*ADHD[\s\S]*診断[\s\S]*治療[\s\S]*改善/u);

assert.equal(count(contents.readme, 'docs/klakk-klack-identity-check.md'), 1);
assert.equal(count(contents.llms, pageUrl), 1);
assert.equal(count(contents.llms, jsonUrl), 1);
assert.match(contents.llms, /KlakkとKlack[\s\S]*K-L-A-K-K[\s\S]*K-L-A-C-K[\s\S]*独立した直接競合製品/u);
assert.equal(count(`${contents.readme}\n${contents.llms}`, 'klakk-klack-identity-check'), 2);
assert.equal(count(`${contents.page}\n${contents.readme}\n${contents.llms}`, campaign), 1);

console.log(JSON.stringify({
  ok: true,
  page: files.page,
  record: files.record,
  faqQuestions: faq.mainEntity.length,
  placementCount: 1,
}, null, 2));
