import{LitElement,css,html}from'lit';
import{customElement,property,state}from'lit/decorators.js';
import type{WorkbookModel,SignalRecord}from'../data/model';

@customElement('nexus-overview')
export class NexusOverview extends LitElement{
 @property({attribute:false})model:WorkbookModel|null=null;
 @state()private expanded=false;
 static styles=css`
 :host{display:block;min-width:0;color:var(--nx-text)}
 .eyebrow{font:11px var(--nx-mono);letter-spacing:.17em;color:var(--nx-cyan);text-transform:uppercase}
 h1{font-size:clamp(28px,4vw,46px);line-height:1.05;margin:7px 0 10px;letter-spacing:-.025em}
 .lead{color:var(--nx-muted);max-width:850px;line-height:1.55;font-size:14px}
 .provenance{display:flex;flex-wrap:wrap;gap:8px 18px;margin:18px 0 22px;color:var(--nx-muted);font:10px var(--nx-mono)}
 .metrics{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:22px 0}
 .metric,.panel{background:linear-gradient(145deg,#202b30,#141c20);border:1px solid var(--nx-line);border-radius:9px}
 .metric{padding:15px;min-width:0}.label{color:var(--nx-muted);font:10px var(--nx-mono);letter-spacing:.08em}
 .value{font:700 clamp(24px,3vw,34px) var(--nx-font);margin-top:8px;white-space:nowrap}
 .unit{font-size:11px;color:var(--nx-muted);font-family:var(--nx-mono)}
 .grid{display:grid;grid-template-columns:minmax(230px,.72fr) minmax(0,1.8fr);gap:12px;align-items:start}
 .panel{padding:17px;min-width:0}.panel h2{font:600 12px var(--nx-mono);letter-spacing:.12em;margin:0 0 15px;color:var(--nx-cyan)}
 .status-list{display:grid;gap:12px}.status-row{display:grid;grid-template-columns:92px minmax(0,1fr) 22px;gap:8px;align-items:center;font:11px var(--nx-mono)}
 .track{height:7px;background:#0d1418;border-radius:9px;overflow:hidden}.fill{height:100%;border-radius:9px;background:var(--nx-cyan)}
 .status-row[data-status="Escalating"] .fill{background:var(--nx-red)}.status-row[data-status="Rising"] .fill{background:var(--nx-amber)}.status-row[data-status="New"] .fill{background:#7da7ce}
 .status-row[data-status="Persistent"] .fill{background:var(--nx-green)}.status-row[data-status="Not Detected"] .fill{background:#69777c}
 .status-name{color:var(--nx-muted)}.status-count{text-align:right}
 .table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:12px;min-width:570px}th{text-align:left;color:var(--nx-muted);font:10px var(--nx-mono);letter-spacing:.08em;padding:9px 8px;border-bottom:1px solid var(--nx-line)}td{padding:11px 8px;border-bottom:1px solid #34434a70;vertical-align:middle}tbody tr:hover{background:#ffffff06}
 .rank,.index{font-family:var(--nx-mono);font-variant-numeric:tabular-nums}.rank{color:var(--nx-muted)}.id{color:var(--nx-cyan);font:11px var(--nx-mono);white-space:nowrap}.topic{min-width:180px;line-height:1.35}.delta{font:10px var(--nx-mono);white-space:nowrap}.positive{color:#82c6a3}.negative{color:#e19b8d}.neutral{color:var(--nx-muted)}
 .status{display:inline-flex;border:1px solid var(--nx-line);border-radius:20px;padding:4px 7px;font:9px var(--nx-mono);white-space:nowrap}.status.escalating{border-color:#a65f60;color:#efaaa3}.status.rising{border-color:#a8844b;color:#e7c58d}.status.new{border-color:#658bb0;color:#a9c8e7}.status.persistent{color:#9ac8ae}.status.fragmenting{color:#c7b0dd}
 .details{margin-top:14px;border-top:1px solid var(--nx-line);padding-top:12px}.details summary{cursor:pointer;color:var(--nx-cyan);font:10px var(--nx-mono);letter-spacing:.08em;padding:6px 0}
 .detail-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:10px 0}.dimension{background:#0e171b;padding:9px;border-radius:6px}.dimension b{display:block;font:17px var(--nx-mono);margin-top:4px}.dimension span{color:var(--nx-muted);font:9px var(--nx-mono)}
 .evidence{font-size:12px;line-height:1.55;color:#c0cbce}.refs{font:10px var(--nx-mono);color:var(--nx-muted);overflow-wrap:anywhere}
 .empty{border:1px dashed var(--nx-line);border-radius:12px;padding:clamp(24px,5vw,48px);background:#141e23}.empty h2{font-size:22px;margin:0 0 10px}.empty p{max-width:600px;color:var(--nx-muted);line-height:1.6}.hint{color:var(--nx-cyan);font:11px var(--nx-mono)}
 .foot{margin-top:14px;color:var(--nx-muted);font:9px var(--nx-mono);line-height:1.5}
 @media(max-width:1050px){.metrics{grid-template-columns:repeat(3,minmax(0,1fr))}.grid{grid-template-columns:1fr}.status-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
 @media(max-width:650px){.metrics{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.metric{padding:12px}.value{font-size:27px}.status-list{grid-template-columns:1fr}.panel{padding:13px}.detail-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.provenance{font-size:9px}.table-wrap{overflow:visible}table{min-width:0}thead{display:none}tbody tr{display:grid;grid-template-columns:42px minmax(0,1fr) auto;gap:3px 8px;padding:11px 0;border-bottom:1px solid var(--nx-line)}td{border:0;padding:2px 0}td:nth-child(1){grid-row:1/3}td:nth-child(2){grid-column:2}td:nth-child(3){grid-column:2;min-width:0}td:nth-child(4){grid-column:3;grid-row:1}.topic{min-width:0}td:nth-child(5){grid-column:3;grid-row:2}td:nth-child(6){grid-column:2/4}.rank{padding-top:3px}}
 `;
 private sorted():SignalRecord[]{return [...(this.model?.signals??[])].sort((a,b)=>(a.rank??999)-(b.rank??999)||(b.signalIndex??-1)-(a.signalIndex??-1));}
 private statuses(){const order=['Escalating','Rising','New','Persistent','Fragmenting','Falling','Not Detected','Resolved'];const s=this.model?.signals??[];return order.map(name=>({name,count:s.filter(x=>x.status.toLowerCase()===name.toLowerCase()).length})).filter(x=>x.count>0);}
 private mean(){const values=(this.model?.signals??[]).map(x=>x.signalIndex).filter((x):x is number=>x!==null&&Number.isFinite(x));return values.length?values.reduce((a,b)=>a+b,0)/values.length:null;}
 private delta(value:number|null){if(value===null)return html`<span class="delta neutral">—</span>`;const cls=value>0?'positive':value<0?'negative':'neutral';return html`<span class="delta ${cls}">${value>0?'+':''}${value.toFixed(1)}</span>`;}
 private signalDetails(s:SignalRecord){return html`<details class="details"><summary>INSPECT SIGNAL / EVIDENCE / DIMENSIONS</summary><div class="detail-grid">${[['IMPORTANCE',s.importance],['ATTENTION',s.attention],['MOMENTUM',s.momentum],['PERSISTENCE',s.persistence],['CONNECTIVITY',s.connectivity]].map(([label,value])=>html`<div class="dimension"><span>${label}</span><b>${value??'—'}</b></div>`)}</div><p class="evidence">${s.evidenceSummary||'No observation text is present in this workbook record.'}</p><p class="refs">CATEGORY: ${s.category||'—'} · CONFIDENCE: ${s.confidence??'—'} · SOURCE COUNT: ${s.sourceCount??'—'}</p><p class="refs">SOURCE IDS: ${s.sourceIds.length?s.sourceIds.join(' · '):'No source IDs recorded'}</p></details>`;}
 render(){const signals=this.sorted(),mean=this.mean(),statuses=this.statuses(),above=signals.filter(s=>s.signalIndex!==null&&s.signalIndex>80).length,moving=signals.filter(s=>['rising','escalating'].includes(s.status.toLowerCase())).length,newCount=signals.filter(s=>s.status.toLowerCase()==='new').length,shown=this.expanded?signals:signals.slice(0,12);return html`
 ${this.model?html`
 <p class="eyebrow">GLOBAL SIGNALS / EXECUTIVE INTELLIGENCE</p><h1>Global situation overview</h1><p class="lead">A source-faithful operational view of the latest imported signal state. Workbook metrics are displayed as supplied; no signal score is recalculated.</p>
 <div class="provenance"><span>SNAPSHOT / ${this.model.snapshot||'DATE NOT IDENTIFIED'}</span><span>WORKBOOK / ${this.model.fileName}</span><span>WORKSHEETS / ${this.model.sheets.length}</span><span>LOCAL DATA / INDEXEDDB</span></div>
 <section class="metrics" aria-label="Executive metrics">
 ${[['CURRENT SIGNALS',signals.length],['MEAN INDEX',mean===null?'—':mean.toFixed(1)],['INDEX ABOVE 80',above],['RISING / ESCALATING',moving],['NEW SIGNALS',newCount]].map(([label,value])=>html`<article class="metric"><div class="label">${label}</div><div class="value">${value}</div></article>`)}
 </section>
 <section class="grid">
 <article class="panel"><h2>SIGNAL STATUS DISTRIBUTION</h2><div class="status-list">${statuses.map(item=>html`<div class="status-row" data-status=${item.name}><span class="status-name">${item.name}</span><div class="track" role="img" aria-label=${item.count} signals, ${item.name}><div class="fill" style=${`width:${signals.length?item.count/signals.length*100:0}%`}></div></div><b class="status-count">${item.count}</b></div>`)}</div><p class="foot">STATUS COUNTS ARE CATEGORICAL SOURCE VALUES. “NOT DETECTED” IS NOT EQUIVALENT TO “RESOLVED”.</p></article>
 <article class="panel"><h2>RANKED SIGNAL REGISTER / ${signals.length} RECORDS</h2><div class="table-wrap"><table aria-label="Ranked global signals"><thead><tr><th>RANK</th><th>ID</th><th>TOPIC</th><th>INDEX</th><th>Δ INDEX</th><th>STATUS</th></tr></thead><tbody>${shown.map(s=>html`<tr><td class="rank">${s.rank??'—'}</td><td class="id">${s.signalId}</td><td class="topic">${s.topic}</td><td class="index">${s.signalIndex===null?'—':s.signalIndex.toFixed(1)}</td><td>${this.delta(s.indexDelta)}</td><td><span class=${'status '+s.status.toLowerCase().replaceAll(' ','-')}>${s.status}</span>${this.signalDetails(s)}</td></tr>`)}</tbody></table></div>${signals.length>12?html`<button class="load" @click=${()=>this.expanded=!this.expanded} style="margin-top:12px">${this.expanded?'SHOW TOP 12':'SHOW ALL '+signals.length+' SIGNALS'}</button>`:''}</article>
 </section><p class="foot">SOURCE WORKBOOK IS READ-ONLY. IMPORTED DATA AND SNAPSHOT HISTORY REMAIN IN THIS BROWSER. MEAN INDEX IS A DISPLAY AGGREGATE OF NON-NULL SOURCE INDICES; INDIVIDUAL SIGNAL SCORES ARE NOT RECOMPUTED.</p>
 `:html`<section class="empty"><p class="eyebrow">GLOBAL NEXUS / LOCAL INTELLIGENCE</p><h2>Executive dashboard awaiting source data</h2><p>Import the cumulative GSIS workbook using LOAD XLSX above, or drop the file into this view. The workbook is parsed in this browser and saved as a new immutable local snapshot. No workbook content is uploaded to a server.</p><span class="hint">SUPPORTED INPUT / XLSX · XLSM</span></section>`}
 `;}
}
declare global{interface HTMLElementTagNameMap{'nexus-overview':NexusOverview}}
