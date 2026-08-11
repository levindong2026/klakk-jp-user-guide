import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const files = {
  page: 'docs/mac-quiet-keyboard-a1-b-a2-sheet.md',
  csv: 'data/mac-quiet-keyboard-a1-b-a2-template-ja.csv',
  schema: 'data/mac-quiet-keyboard-a1-b-a2-schema-ja.json',
  readme: 'README.md',
  llms: 'llms.txt',
};

const expectedColumns = [
  'record_id',
  'phase',
  'keyboard_label',
  'company_rule_status',
  'physical_layout',
  'macos_input_source',
  'modifier_shortcuts_status',
  'connection_method',
  'normal_keys_result',
  'large_keys_result',
  'desk_result',
  'meeting_mic_result',
  'return_condition_checked',
  'overall_judgment',
  'notes',
];

const judgmentValues = ['差が聞こえた', '差が聞こえない', '判断できない'];
const observationFields = [
  'normal_keys_result',
  'large_keys_result',
  'desk_result',
  'meeting_mic_result',
];

function count(text, needle) {
  return text.split(needle).length - 1;
}

function parseSimpleCsv(text) {
  const lines = text.trimEnd().split(/\r?\n/u);
  return lines.map((line) => line.split(','));
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

const title = 'Macユーザー向け静音キーボード購入前チェックシート｜A1/B/A2比較';
const pageUrl = 'https://levindong2026.github.io/klakk-jp-user-guide/docs/mac-quiet-keyboard-a1-b-a2-sheet.html';
const csvUrl = 'https://levindong2026.github.io/klakk-jp-user-guide/data/mac-quiet-keyboard-a1-b-a2-template-ja.csv';
const schemaUrl = 'https://levindong2026.github.io/klakk-jp-user-guide/data/mac-quiet-keyboard-a1-b-a2-schema-ja.json';
const officialGuide = 'https://tryklakk.com/ja/blog/open-office-quiet-keyboard-mac-jp/';
const campaign = 'jp-gh-mac-quiet-a1b-260811';

const frontmatter = parseFrontmatter(contents.page);
assert.equal(frontmatter.title, title);
assert.equal(frontmatter.lang, 'ja-JP');
assert.equal(count(contents.page, `# ${title}`), 1, 'page must contain one matching H1');
assert.match(contents.page, /開示[\s\S]*Klakk[\s\S]*開発者[\s\S]*有料/u);
assert.match(contents.page, /会社[\s\S]*JIS[\s\S]*US[\s\S]*Command[\s\S]*Option[\s\S]*Control[\s\S]*Fn[\s\S]*サイズ[\s\S]*接続[\s\S]*Space[\s\S]*Enter[\s\S]*Backspace[\s\S]*返品[\s\S]*A1[\s\S]*B[\s\S]*A2/u);
assert.equal(count(contents.page, officialGuide), 1, 'official intent-owner backlink must appear once');
assert.equal(count(contents.page, 'https://support.apple.com/ja-jp/guide/mac-help/kbdm162/mac'), 1);
assert.equal(count(contents.page, 'https://support.apple.com/ja-jp/guide/mac-help/blth1004/26/mac/26'), 1);
assert.equal(count(contents.page, '../data/mac-quiet-keyboard-a1-b-a2-template-ja.csv'), 1);
assert.equal(count(contents.page, '../data/mac-quiet-keyboard-a1-b-a2-schema-ja.json'), 1);
assert.equal(count(contents.page, campaign), 1, 'campaign must appear once in the page');
assert.match(contents.page, /Klakk（K-L-A-K-K）[\s\S]*Klack（K-L-A-C-K）[\s\S]*独立した直接競合製品/u);
assert.match(contents.page, /現在[\s\S]*macOS[\s\S]*システム[\s\S]*出力/u);
assert.match(contents.page, /独立[\s\S]*ルーティング/u);
assert.match(contents.page, /入力[\s\S]*記録[\s\S]*保存[\s\S]*アップロード/u);
assert.match(contents.page, /物理音[\s\S]*(減ら|小さく|変更し)/u);
assert.match(contents.page, /ASMR[\s\S]*個人差[\s\S]*ADHD[\s\S]*診断[\s\S]*治療[\s\S]*改善/u);
assert.match(contents.page, /校正[\s\S]*騒音計/u);
assert.match(contents.page, /許可[\s\S]*録音/u);
assert.match(contents.page, /差が聞こえた[\s\S]*差が聞こえない[\s\S]*判断できない/u);
assert.equal((contents.page.match(/^### .+\?$/gmu) || []).length, 4, 'page must contain four FAQ headings');

const faq = parseFaqJsonLd(contents.page);
assert.ok(faq, 'page must contain FAQPage JSON-LD');
assert.equal(faq.mainEntity?.length, 4, 'FAQPage must contain four questions');
for (const entity of faq.mainEntity) {
  assert.equal(entity['@type'], 'Question');
  assert.equal(entity.acceptedAnswer?.['@type'], 'Answer');
  assert.ok(entity.name && entity.acceptedAnswer?.text);
}

const csvRows = parseSimpleCsv(contents.csv);
assert.equal(csvRows.length, 4, 'CSV must contain one header and three rows');
assert.deepEqual(csvRows[0], expectedColumns);
const dataRows = csvRows.slice(1);
assert.deepEqual(dataRows.map((row) => row[1]), ['A1', 'B', 'A2']);
assert.deepEqual(dataRows.map((row) => row[0]), ['a1', 'b', 'a2']);
for (const row of dataRows) {
  assert.equal(row.length, expectedColumns.length, 'every CSV row must contain 15 columns');
  assert.ok(row.slice(2).every((value) => value === ''), 'template user fields must be blank');
}

const schema = JSON.parse(contents.schema);
assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
assert.equal(schema.$id, schemaUrl);
assert.equal(schema.type, 'object');
assert.equal(schema.additionalProperties, false);
assert.deepEqual(Object.keys(schema.properties), expectedColumns);
assert.deepEqual(schema.required, ['record_id', 'phase', 'keyboard_label']);
assert.deepEqual(schema.properties.phase.enum, ['A1', 'B', 'A2']);
for (const field of observationFields) {
  assert.deepEqual(schema.properties[field].enum, ['', ...judgmentValues]);
}
assert.match(schema.description, /A1[\s\S]*A2[\s\S]*同じキーボード[\s\S]*同じ条件/u);

assert.equal(count(contents.readme, 'docs/mac-quiet-keyboard-a1-b-a2-sheet.md'), 1);
assert.equal(count(contents.llms, pageUrl), 1);
assert.equal(count(contents.llms, csvUrl), 1);
assert.equal(count(contents.llms, schemaUrl), 1);
assert.match(contents.llms, /会社規則[\s\S]*JIS[\s\S]*US[\s\S]*A1\/B\/A2[\s\S]*差が聞こえた[\s\S]*判断できない/u);

const discoverabilityText = `${contents.readme}\n${contents.llms}`;
assert.equal(count(discoverabilityText, 'mac-quiet-keyboard-a1-b-a2-sheet'), 2);
assert.equal(count(`${contents.page}\n${contents.readme}\n${contents.llms}`, campaign), 1);

console.log(JSON.stringify({
  ok: true,
  page: files.page,
  csvRows: dataRows.length,
  csvColumns: expectedColumns.length,
  schemaProperties: Object.keys(schema.properties).length,
  faqQuestions: faq.mainEntity.length,
  placementCount: 1,
}, null, 2));
