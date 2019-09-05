import React, {useRef, useEffect} from 'react'
import { Accordion, Button, Card } from 'react-bootstrap'
import { FaChevronDown } from 'react-icons/fa'
import * as d3 from 'd3'

const ResultBox = ({ id1, id2, results}) => {
  const colorFunc = (v) => {
    if (v < 0.5) {
      const r = 255
      const g = Math.round(255*2*v)
      const b = 0
      return(`rgb(${r},${g},${b})`)
    } else {
      const r = Math.round(255*2*(1.0-v))
      const g = 255
      const b = 0
      return(`rgb(${r},${g},${b})`)
    }
  }

  const svgDivRef = useRef(null)
  const headerRef = useRef(null)
  var svg = null
  var div = null
  var nodeRect1 = null
  var nodeRect2 = null
  var nodeText1 = null
  var nodeText2 = null
  var w = 0

  const updateSvg = () => {
    w = Math.max(w, headerRef.current.clientWidth)
    svg.attr("width", w)
    if (results.length > 1) {
      if (results[0].length > 1) {
        const l1 = results.length
        const l2 = results[0].length
        const cw = w / l2
        svg.attr("height", cw * l1)
        nodeRect1.attr("x", (d,i) => d.x*cw+1).attr("width", cw-2).attr("height", cw-2)
      } else {
        nodeRect1.attr("width", (d,i) => d[0]*w)
        nodeRect2.attr("x", (d,i) => d[0]*w).attr("width", (d,i) => w-d[0]*w)
        nodeText1.attr("x", w-70)
      }
    } else {
      nodeRect1.attr("width", (d,i) => d*w)
      nodeRect2.attr("x", (d,i) => d*w).attr("width", (d,i) => w-d*w)
      nodeText1.attr("x", w-100)
    }
  }
  
  useEffect(() => {
    if (svgDivRef.current.children.length === 0) {
      w = Math.max(w, headerRef.current.clientWidth)
      if (results.length > 1) {
        if (results[0].length > 1) {
          const l1 = results.length
          const l2 = results[0].length
          const cw = w / l2
          const vals = []
          results.map((r,i) => {r.map((c,j) => {vals.push({y: i, x: j, v: c})})})
          svg = d3.select(svgDivRef.current).append("svg").attr("width", w).attr("height", cw * l1)
          div = d3.select("body").append("div").style("opacity", 0).style('position', 'absolute').style('padding', '2px').style('width', '250px').style('height', '75px').style('font-family', "'Source Code Pro', monospace").style('background', 'lightsteelblue').style('border-radius', '8px')
          nodeRect1 = svg.selectAll("rect1").data(vals).enter().append("g").classed('rect1', true)
          nodeRect1.append("rect").attr("x", (d,i) => d.x*cw+1).attr("y", (d,i) => d.y*cw+1).attr("width", cw-2).attr("height", cw-2).attr("fill", (d,i) => colorFunc(d.v)).on("mouseover", function(d) {
              div.transition()		
                .duration(200)
                .style("opacity", 1.0)
              div.html(`Index: ${d.x} | ${d.y}<br/>Sequence: ${id1.slice(Math.max(0,d.y-3),d.y)}<b>${id1[d.y]}</b>${id1.slice(d.y+1,Math.min(id1.length,d.y+3))} | ${id2.slice(Math.max(0,d.x-3),d.x)}<b>${id2[d.x]}</b>${id2.slice(d.x+1,Math.min(id2.length,d.x+3))}<br/>Value: ${d.v.toFixed(3)}`)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px")
            })
        } else {
          const l1 = results.length
          svg = d3.select(svgDivRef.current).append("svg").attr("width", w).attr("height", 30 * l1)
          nodeRect1 = svg.selectAll("rect1").data(results).enter().append("g").classed('rect1', true)
          nodeRect1.append("rect").attr("x", (d,i) => 0).attr("y", (d,i) => i*30+1).attr("width", (d,i) => d[0]*w).attr("height", 28).attr("fill", (d,i) => colorFunc(d[0]))
          nodeRect2 = svg.selectAll("rect2").data(results).enter().append("g").classed('rect2', true)
          nodeRect2.append("rect").attr("x", (d,i) => d[0]*w).attr("y", (d,i) => i*30+1).attr("width", (d,i) => w-d[0]*w).attr("height", 28).attr("fill", "gray").attr("fill-opacity", 0.3)
          nodeText1 = svg.selectAll("text1").data(results).enter().append("g").classed('text1', true)
          nodeText1.append("text").attr("x", w-70).attr("y", (d,i) => (i+1)*30-8).attr("font-size", 20).attr("font-family", "'Source Code Pro', monospace").text((d,i) => d[0].toFixed(3))
          nodeText2 = svg.selectAll("text2").data(results).enter().append("g").classed('text2', true)
          nodeText2.append("text").attr("x", 20).attr("y", (d,i) => (i+1)*30-8).attr("font-size", 20).attr("font-family", "'Source Code Pro', monospace").text((d,i) => id1[i])
        }
      } else {
        svg = d3.select(svgDivRef.current).append("svg").attr("width", w).attr("height", 50)
        nodeRect1 = svg.selectAll("rect1").data(results[0]).enter().append("g").classed('rect1', true)
        nodeRect1.append("rect").attr("x", 0).attr("y", 0).attr("width", (d,i) => d*w).attr("height", 50).attr("fill", (d,i) => colorFunc(d))
        nodeRect2 = svg.selectAll("rect2").data(results[0]).enter().append("g").classed('rect2', true)
        nodeRect2.append("rect").attr("x", (d,i) => d*w).attr("y", 0).attr("width", (d,i) => w-d*w).attr("height", 50).attr("fill", "gray").attr("fill-opacity", 0.3)
        nodeText1 = svg.selectAll("text1").data(results[0]).enter().append("g").classed('text1', true)
        nodeText1.append("text").attr("x", w-100).attr("y", 35).attr("font-size", 30).attr("font-family", "'Source Code Pro', monospace").text((d) => d.toFixed(3))
      }
    }
  })

  return(
      <Accordion style={{paddingBottom: ""}}>
        <Card>
          <Accordion.Toggle ref={headerRef} as={Card.Header} eventKey="0" style={{float: 'left'}} onClick={() => {updateSvg()}}>
            <h3 style={{fontFamily: '"Source Code Pro", monospace'}}>{id1.slice(0,20)+(id1.length > 20 ? '...' : '')} | {id2.slice(0,20)+(id2.length > 20 ? '...' : '')}</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0" as={Card.Body}>
            <div ref={svgDivRef} style={{width: '100%'}}></div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
  )
}

export default ResultBox