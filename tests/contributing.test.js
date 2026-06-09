import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const CONTRIBUTING_PATH = resolve(REPO_ROOT, 'CONTRIBUTING.md');

const content = readFileSync(CONTRIBUTING_PATH, 'utf8');
const lines = content.split('\n');

// ---------------------------------------------------------------------------
// File existence and basic structure
// ---------------------------------------------------------------------------

describe('CONTRIBUTING.md – file presence and basic structure', () => {
    it('file exists on disk', () => {
        assert.ok(existsSync(CONTRIBUTING_PATH), 'CONTRIBUTING.md must exist');
    });

    it('file is non-empty', () => {
        assert.ok(content.trim().length > 0, 'CONTRIBUTING.md must not be empty');
    });

    it('starts with an H1 title about contributing to Ditto', () => {
        const firstHeading = lines.find((l) => l.startsWith('# '));
        assert.ok(firstHeading, 'Must have an H1 heading');
        assert.match(firstHeading, /Contributing to Ditto/i);
    });

    it('contains exactly 5 numbered sections', () => {
        const numberedSections = lines.filter((l) => /^## \d+\./.test(l));
        assert.strictEqual(
            numberedSections.length,
            5,
            `Expected 5 numbered sections, found ${numberedSections.length}: ${numberedSections.join(', ')}`,
        );
    });

    it('sections are sequentially numbered from 1 to 5', () => {
        const numberedSections = lines.filter((l) => /^## \d+\./.test(l));
        numberedSections.forEach((section, idx) => {
            const expected = idx + 1;
            assert.match(
                section,
                new RegExp(`^## ${expected}\\.`),
                `Section at index ${idx} should be numbered ${expected}: "${section}"`,
            );
        });
    });
});

// ---------------------------------------------------------------------------
// Section 1 – How to get started
// ---------------------------------------------------------------------------

describe('CONTRIBUTING.md – Section 1: How to get started', () => {
    it('section heading exists', () => {
        assert.ok(
            content.includes('## 1. How to get started'),
            'Section "## 1. How to get started" must be present',
        );
    });

    it('references the "good first issue" label', () => {
        assert.ok(
            content.includes('good first issue'),
            'Must mention the "good first issue" issue label',
        );
    });

    it('references the "help wanted" label', () => {
        assert.ok(content.includes('help wanted'), 'Must mention the "help wanted" issue label');
    });

    it('mentions the Pondering Orange mascot state', () => {
        assert.ok(
            content.includes('Pondering Orange'),
            'Must mention the "Pondering Orange" mascot state',
        );
    });

    it('references the mascot image md-assets/pic3.png', () => {
        assert.ok(
            content.includes('md-assets/pic3.png'),
            'Must reference the mascot image path md-assets/pic3.png',
        );
    });
});

// ---------------------------------------------------------------------------
// Section 2 – The Development Workflow
// ---------------------------------------------------------------------------

describe('CONTRIBUTING.md – Section 2: The Development Workflow', () => {
    it('section heading exists', () => {
        assert.ok(
            content.includes('## 2. The Development Workflow'),
            'Section "## 2. The Development Workflow" must be present',
        );
    });

    it('specifies LÖVE 11.4 as the required runtime', () => {
        assert.ok(content.includes('LÖVE 11.4'), 'Must specify LÖVE 11.4 as required runtime');
    });

    it('links to love2d.org', () => {
        assert.ok(content.includes('love2d.org'), 'Must include a link to love2d.org');
    });

    it('mentions feature/ branch naming convention', () => {
        assert.ok(
            content.includes('feature/'),
            'Must mention the feature/ branch naming convention',
        );
    });

    it('mentions fix/ branch naming convention', () => {
        assert.ok(content.includes('fix/'), 'Must mention the fix/ branch naming convention');
    });

    it('warns against pushing directly to main', () => {
        assert.ok(
            content.includes('main'),
            'Must warn contributors not to push directly to main',
        );
        assert.match(
            content,
            /never push directly to `main`/i,
            'Must explicitly say "never push directly to `main`"',
        );
    });

    it('instructs contributors to verify the engine boots before submitting a PR', () => {
        assert.match(
            content,
            /engine still boots/i,
            'Must instruct contributors to ensure the engine still boots',
        );
    });
});

// ---------------------------------------------------------------------------
// Section 3 – Coding Standards
// ---------------------------------------------------------------------------

describe('CONTRIBUTING.md – Section 3: Coding Standards', () => {
    it('section heading exists', () => {
        assert.ok(
            content.includes('## 3. Coding Standards'),
            'Section "## 3. Coding Standards" must be present',
        );
    });

    it('mentions the Hacker-Minimalist philosophy', () => {
        assert.ok(
            content.includes('Hacker-Minimalist'),
            'Must describe the "Hacker-Minimalist" coding philosophy',
        );
    });

    it('advises commenting code for the rendering pipeline and shaders', () => {
        assert.match(
            content,
            /rendering pipeline/i,
            'Must mention the rendering pipeline in the commenting guidance',
        );
    });

    it('prohibits writing to _G (global pollution)', () => {
        assert.ok(content.includes('_G'), 'Must warn against writing to the _G global table');
    });

    it('advises encapsulating logic in local tables', () => {
        assert.match(
            content,
            /local tables/i,
            'Must advise encapsulating logic in local tables',
        );
    });
});

// ---------------------------------------------------------------------------
// Section 4 – Pull Request Process
// ---------------------------------------------------------------------------

describe('CONTRIBUTING.md – Section 4: Pull Request Process', () => {
    it('section heading exists', () => {
        assert.ok(
            content.includes('## 4. Pull Request Process'),
            'Section "## 4. Pull Request Process" must be present',
        );
    });

    it('provides a PR title format example', () => {
        assert.match(
            content,
            /fix: resolve mascot rendering bug/i,
            'Must include an example PR title following the fix: prefix convention',
        );
    });

    it('asks contributors to explain changes in the description', () => {
        assert.match(
            content,
            /Explain what you changed and why/i,
            'Must ask contributors to explain what they changed and why',
        );
    });

    it('mentions PR review by maintainers', () => {
        assert.match(content, /reviewed by the maintainers/i, 'Must mention maintainer review');
    });
});

// ---------------------------------------------------------------------------
// Section 5 – Folder Structure
// ---------------------------------------------------------------------------

describe('CONTRIBUTING.md – Section 5: Folder Structure', () => {
    it('section heading exists', () => {
        assert.ok(
            content.includes('## 5. Folder Structure'),
            'Section "## 5. Folder Structure" must be present',
        );
    });

    it('documents the /src folder', () => {
        assert.ok(content.includes('/src'), 'Must document the /src folder');
    });

    it('documents the /lib folder', () => {
        assert.ok(content.includes('/lib'), 'Must document the /lib folder');
    });

    it('documents the /assets folder', () => {
        assert.ok(content.includes('/assets'), 'Must document the /assets folder');
    });

    it('documents the /md-assets folder', () => {
        assert.ok(content.includes('/md-assets'), 'Must document the /md-assets folder');
    });

    it('/src is described as core engine logic', () => {
        assert.match(
            content,
            /\/src.*Core engine logic/i,
            '/src must be described as Core engine logic',
        );
    });

    it('/lib is described as third-party libraries', () => {
        assert.match(
            content,
            /\/lib.*Third-party libraries/i,
            '/lib must be described as Third-party libraries',
        );
    });
});

// ---------------------------------------------------------------------------
// Referenced assets exist on disk
// ---------------------------------------------------------------------------

describe('CONTRIBUTING.md – referenced asset files exist', () => {
    it('md-assets/pic3.png (Pondering Orange) exists on disk', () => {
        const assetPath = resolve(REPO_ROOT, 'md-assets', 'pic3.png');
        assert.ok(
            existsSync(assetPath),
            `The image md-assets/pic3.png referenced in CONTRIBUTING.md must exist at ${assetPath}`,
        );
    });
});

// ---------------------------------------------------------------------------
// Regression / boundary / negative cases
// ---------------------------------------------------------------------------

describe('CONTRIBUTING.md – regression and boundary cases', () => {
    it('does not end with trailing whitespace on the title line', () => {
        const titleLine = lines.find((l) => l.startsWith('# Contributing'));
        assert.ok(titleLine !== undefined, 'Title line must exist');
        assert.strictEqual(
            titleLine,
            titleLine.trimEnd(),
            'Title line must not have trailing whitespace',
        );
    });

    it('has no duplicate section numbers', () => {
        const sectionNumbers = lines
            .filter((l) => /^## \d+\./.test(l))
            .map((l) => parseInt(l.match(/^## (\d+)\./)[1], 10));
        const unique = new Set(sectionNumbers);
        assert.strictEqual(
            unique.size,
            sectionNumbers.length,
            `Duplicate section numbers detected: ${sectionNumbers}`,
        );
    });

    it('all H2 section headings use the ## prefix (not ### or deeper)', () => {
        const h2Lines = lines.filter((l) => /^## [^#]/.test(l));
        assert.ok(h2Lines.length >= 5, 'Must have at least 5 H2 section headings');
        h2Lines.forEach((h) => {
            assert.ok(!h.startsWith('###'), `Heading "${h}" must not use ### or deeper`);
        });
    });

    it('branch naming section does not omit either feature/ or fix/', () => {
        const workflowSection = content.slice(
            content.indexOf('## 2. The Development Workflow'),
            content.indexOf('## 3. Coding Standards'),
        );
        assert.ok(
            workflowSection.includes('feature/'),
            'Workflow section must include feature/ branch convention',
        );
        assert.ok(
            workflowSection.includes('fix/'),
            'Workflow section must include fix/ branch convention',
        );
    });

    it('file uses Unix line endings (LF) throughout', () => {
        const rawContent = readFileSync(CONTRIBUTING_PATH);
        const crlfCount = [...rawContent].filter(
            (b, i) => b === 13 && rawContent[i + 1] === 10,
        ).length;
        assert.strictEqual(crlfCount, 0, 'CONTRIBUTING.md must not contain CRLF line endings');
    });

    it('intro paragraph mentions both seasoned developers and newcomers implicitly', () => {
        assert.match(
            content,
            /seasoned developer/i,
            'Intro must acknowledge experienced contributors',
        );
        assert.match(
            content,
            /newcomers/i,
            'Section 1 must acknowledge newcomers explicitly',
        );
    });
});
