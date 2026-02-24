var fs = require("fs");
var NL = "\n";
// CSS part
var css = [
".drop-zone { border: 2px dashed var(--border); border-radius: 10px; padding: 40px 24px; text-align: center; cursor: pointer; transition: border-color 0.2s, background 0.2s; background: var(--surface2); position: relative; user-select: none; }",
".drop-zone:hover, .drop-zone.drag-over { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 6%, var(--surface2)); }",
".drop-zone input[type=file] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }",
".drop-zone-icon { font-size: 36px; margin-bottom: 12px; line-height: 1; }",
".drop-zone-label { font-family: JetBrains Mono, monospace; font-size: 13px; color: var(--text-dim); margin-bottom: 6px; }",
".drop-zone-sub { font-family: JetBrains Mono, monospace; font-size: 11px; color: var(--text-muted); }",
".drop-zone.has-file { border-style: solid; border-color: var(--accent); padding: 16px 24px; }",
